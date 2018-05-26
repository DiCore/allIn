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

@interface CameraManager () <CaptureSessionCoordinatorDelegate>

@property (nonatomic, strong) CaptureSessionCoordinator *captureSessionCoordinator;

@property (nonatomic, strong) NSDate *startDate;

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
  return @[@"EventResize"];
}

RCT_EXPORT_METHOD(generateHighlight:(int)seconds)
{
  NSLog(@"HIGHLIGHT GENERATE %d", seconds);
}

RCT_EXPORT_METHOD(startSession)
{
  NSLog(@"Start session");
  [UIApplication sharedApplication].idleTimerDisabled = YES;
  [self.captureSessionCoordinator startRecording];
}

RCT_EXPORT_METHOD(stopSession)
{
  NSLog(@"Stop session");
  [UIApplication sharedApplication].idleTimerDisabled = NO;
  [self.captureSessionCoordinator stopRunning];
}

#pragma mark - CaptureSessionCoordinatorDelegate methods

- (void)coordinatorDidBeginRecording:(CaptureSessionCoordinator *)coordinator {
  NSLog(@"Did begin recording");
  
  self.startDate = [NSDate date];
}

- (void)coordinator:(CaptureSessionCoordinator *)coordinator didFinishRecordingToOutputFileURL:(NSURL *)outputFileURL error:(NSError *)error {
  NSLog(@"Did finish recording to: %@", outputFileURL);
}

#pragma mark - Private methods

- (void)setup {
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

@end
