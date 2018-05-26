//
//  CameraManager.m
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import "CameraManager.h"
#import "CameraView.h"
#import "CaptureSessionAssetWriterCoordinator.h"
#import "CaptureSessionMovieFileOutputCoordinator.h"
#import "AppDelegate.h"

@interface HighlightInfo : NSObject

@property (nonatomic) NSTimeInterval begin;
@property (nonatomic) NSTimeInterval end;
@property (nonatomic, strong) NSURL *videoURL;
@property (nonatomic, strong) NSURL *imageURL;

@end

@implementation HighlightInfo
@end

@interface CameraManager () <CaptureSessionCoordinatorDelegate>

@property (nonatomic, strong) CaptureSessionCoordinator *captureSessionCoordinator;

@property (nonatomic, strong) NSDate *startDate;
@property (nonatomic, strong) NSMutableArray *highlights;

@end

@implementation CameraManager

RCT_EXPORT_MODULE();

+ (CameraView *)cameraView {
  static CameraView *_camerView = nil;
  
  if (!_camerView) {
    _camerView = [CameraView new];
  }
  
  return _camerView;
}

- (instancetype)init {
  self = [super init];
  
  if (self != nil) {
    [self setup];
  }
  
  return self;
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventResize", @"EventHighlightGenerated"];
}

RCT_EXPORT_METHOD(generateHighlight:(int)seconds)
{
  seconds = 5;
  dispatch_async(dispatch_get_main_queue(), ^{
    NSLog(@"HIGHLIGHT GENERATE %d", seconds);
    
    NSTimeInterval end = -[self.startDate timeIntervalSinceNow];
    if (end <= 5) {
      return;
    }
    
    NSTimeInterval begin = MAX(0, end - seconds);
    HighlightInfo *info = [HighlightInfo new];
    info.end = end;
    info.begin = begin;
    [self.highlights addObject:info];
    
    NSArray *searchPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentPath = [searchPaths objectAtIndex:0];
    NSString *imagePath = [documentPath stringByAppendingPathComponent:[NSString stringWithFormat:@"%d.jpg", (int)self.highlights.count - 1]];
    if ([[NSFileManager defaultManager] fileExistsAtPath:imagePath]) {
      [[NSFileManager defaultManager] removeItemAtPath:imagePath error:NULL];
    }
    
    UIGraphicsBeginImageContextWithOptions(CameraManager.cameraView.bounds.size, YES, [UIScreen mainScreen].scale);
    [CameraManager.cameraView drawViewHierarchyInRect:CameraManager.cameraView.bounds afterScreenUpdates:NO];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    if (image != nil) {
      [UIImageJPEGRepresentation(image, 0.8) writeToFile:imagePath atomically:YES];
    }
    info.imageURL = [NSURL fileURLWithPath:imagePath];
    
    [self sendEventWithName:@"EventHighlightGenerated" body:@{@"imagePath" : info.imageURL.path}];
  });
}

RCT_EXPORT_METHOD(startSession)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    NSLog(@"Start session");
    [UIApplication sharedApplication].idleTimerDisabled = YES;
    [self.highlights removeAllObjects];
    [self.captureSessionCoordinator startRecording];
  });
}

RCT_EXPORT_METHOD(stopSession)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    NSLog(@"Stop session");
    [UIApplication sharedApplication].idleTimerDisabled = NO;
    [self.captureSessionCoordinator stopRunning];
  });
}

#pragma mark - CaptureSessionCoordinatorDelegate methods

- (void)coordinatorDidBeginRecording:(CaptureSessionCoordinator *)coordinator {
  NSLog(@"Did begin recording");
  
  self.startDate = [NSDate date];
}

- (void)coordinator:(CaptureSessionCoordinator *)coordinator didFinishRecordingToOutputFileURL:(NSURL *)outputFileURL error:(NSError *)error {
  NSLog(@"Did finish recording to: %@", outputFileURL);
  
  [self createHighlights:outputFileURL completion:^(BOOL result) {
    dispatch_async(dispatch_get_main_queue(), ^{
      NSLog(@"TRIMMED");
    });
  }];
}

#pragma mark - Private methods

- (void)setup {
  self.highlights = [NSMutableArray array];
  
  self.captureSessionCoordinator = [CaptureSessionMovieFileOutputCoordinator new];
  [self.captureSessionCoordinator setDelegate:self callbackQueue:dispatch_get_main_queue()];
  CameraManager.cameraView.previewLayer = self.captureSessionCoordinator.previewLayer;
  [self.captureSessionCoordinator startRunning];
  
  [UIApplication sharedApplication].idleTimerDisabled = YES;
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleRootViewResize) name:@"rootViewResize" object:nil];
}

- (void)handleRootViewResize {
  CGSize size = ((AppDelegate *)([UIApplication sharedApplication].delegate)).rootView.frame.size;
  [self sendEventWithName:@"EventResize" body:@{@"width": [NSNumber numberWithInt: size.width],
                                                @"height": [NSNumber numberWithInt:size.height] }];
}

- (void)createHighlights:(NSURL *)videoURL completion:(void (^)(BOOL))completion {
  if (self.highlights.count == 0) {
    completion(YES);
    return;
  }
  
  NSArray *searchPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentPath = [searchPaths objectAtIndex:0];
  
  [self createHighlight:videoURL
               basePath:documentPath
                  index:0
             completion:completion];
}

- (void)createHighlight:(NSURL *)videoURL
               basePath:(NSString *)basePath
                  index:(int)index
             completion:(void (^)(BOOL))completion {
  
  AVAsset *asset = [AVURLAsset assetWithURL:videoURL];
  AVAssetExportSession *session = [[AVAssetExportSession alloc]
                                   initWithAsset:asset presetName:AVAssetExportPresetHighestQuality];
  NSString *path = [basePath stringByAppendingPathComponent:[NSString stringWithFormat:@"%d.mov", index]];
  NSString *imagePath = [basePath stringByAppendingPathComponent:[NSString stringWithFormat:@"%d.jpg", index]];
  if ([[NSFileManager defaultManager] fileExistsAtPath:path]) {
    [[NSFileManager defaultManager] removeItemAtPath:path error:NULL];
  }
  if ([[NSFileManager defaultManager] fileExistsAtPath:imagePath]) {
    [[NSFileManager defaultManager] removeItemAtPath:imagePath error:NULL];
  }
  
  HighlightInfo *info = self.highlights[index];
  session.outputURL = [NSURL fileURLWithPath:path];
  session.outputFileType = AVFileTypeQuickTimeMovie;
  CMTime start = CMTimeMakeWithSeconds(info.begin, 600);
  CMTime duration = CMTimeMakeWithSeconds(info.end - info.begin, 600);
  CMTimeRange range = CMTimeRangeMake(start, duration);
  session.timeRange = range;
  [session exportAsynchronouslyWithCompletionHandler:^{
    switch ([session status]) {
      case AVAssetExportSessionStatusFailed:
        NSLog(@"Export failed: %@", [[session error] localizedDescription]);
        completion(NO);
        break;
      case AVAssetExportSessionStatusCancelled:
        NSLog(@"Export canceled");
        completion(NO);
        break;
      case AVAssetExportSessionStatusCompleted: {
        HighlightInfo *highlight = self.highlights[index];
        highlight.videoURL = session.outputURL;
//
//        AVAsset *highlightAsset = [AVURLAsset assetWithURL:highlight.videoURL];
//        AVAssetImageGenerator *imageGenerator = [[AVAssetImageGenerator alloc] initWithAsset:highlightAsset];
//        Float64 durationSeconds = CMTimeGetSeconds([highlightAsset duration]);
//        CMTime point = CMTimeMakeWithSeconds(durationSeconds, 600);
//        NSError *error;
//        CMTime actualTime;
//
//        CGImageRef image = [imageGenerator copyCGImageAtTime:point actualTime:&actualTime error:&error];
//        if (image != nil) {
//          [UIImageJPEGRepresentation([UIImage imageWithCGImage:image], 0.8) writeToFile:imagePath atomically:YES];
//          CGImageRelease(image);
//        }
//
//        highlight.previewURL = [NSURL fileURLWithPath:imagePath];
        
        if (index == self.highlights.count - 1) {
          completion(YES);
        } else {
          [self createHighlight:videoURL
                       basePath:basePath
                          index:index + 1
                     completion:completion];
        }
      }
        break;
      default:
        break;
    }
  }];
}

@end
