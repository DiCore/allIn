//
// MKOVideoMerge.m
//
// Copyright (c) 2015 Mathias Koehnke (http://www.mathiaskoehnke.com)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#import "MKOVideoMerge.h"
#import <AVFoundation/AVFoundation.h>

@implementation MKOVideoMerge

+ (void)mergeVideoFiles:(NSArray *)fileURLs
         resultFileName:(NSString *)name
             completion:(void(^)(NSURL *mergedVideoFile, NSError *error))completion {
    
    NSLog(@"Start merging video files ...");
    
    AVMutableComposition *composition = [[AVMutableComposition alloc] init];
    AVMutableCompositionTrack *videoTrack = [composition addMutableTrackWithMediaType:AVMediaTypeVideo preferredTrackID:kCMPersistentTrackID_Invalid];
  videoTrack.preferredTransform = CGAffineTransformMakeRotation(M_PI_2);
//    AVMutableCompositionTrack *audioTrack = [composition addMutableTrackWithMediaType:AVMediaTypeAudio preferredTrackID:kCMPersistentTrackID_Invalid];
    NSMutableArray *instructions = [NSMutableArray new];
    
    __block BOOL errorOccurred = NO;
    __block CMTime currentTime = kCMTimeZero;
    __block CGSize size = CGSizeZero;
    __block int32_t highestFrameRate = 0;
  
  __block CMTime lastTime = kCMTimeZero;
  
    [fileURLs enumerateObjectsUsingBlock:^(NSURL *fileURL, NSUInteger idx, BOOL *stop) {
        #pragma unused(idx)
      
      AVAsset* sourceAsset = [AVAsset assetWithURL:fileURL];
        AVAssetTrack *videoAsset = [[sourceAsset tracksWithMediaType:AVMediaTypeVideo] firstObject];
        AVAssetTrack *audioAsset = [[sourceAsset tracksWithMediaType:AVMediaTypeAudio] firstObject];
      CMTime startTime = lastTime;
      CMTime durationTime = sourceAsset.duration;
      CMTimeRange range = CMTimeRangeMake(startTime, durationTime);

      [videoTrack insertTimeRange:range
                          ofTrack:[[sourceAsset tracksWithMediaType:AVMediaTypeVideo] objectAtIndex:0]
                           atTime:lastTime
                            error:nil];
      lastTime = CMTimeAdd(lastTime, durationTime);
//        CMTime trimmingTime = CMTimeMake(lround(videoAsset.naturalTimeScale / videoAsset.nominalFrameRate), videoAsset.naturalTimeScale);
//        CMTimeRange timeRange = CMTimeRangeMake(trimmingTime, CMTimeSubtract(videoAsset.timeRange.duration, trimmingTime));
//
//        NSError *videoError;
//        BOOL videoResult = [videoTrack insertTimeRange:timeRange ofTrack:videoAsset atTime:currentTime error:&videoError];
//
//        NSError *audioError;
//        BOOL audioResult = [audioTrack insertTimeRange:timeRange ofTrack:audioAsset atTime:currentTime error:&audioError];
//
//        if(!videoResult || /*!audioResult ||*/ videoError /*|| audioError*/) {
//            if (completion) completion(nil, videoError? : audioError);
//            errorOccurred = YES;
//            *stop = YES;
//        } else {
//            AVMutableVideoCompositionInstruction *videoCompositionInstruction = [AVMutableVideoCompositionInstruction videoCompositionInstruction];
//            videoCompositionInstruction.timeRange = CMTimeRangeMake(currentTime, timeRange.duration);
//          AVMutableVideoCompositionLayerInstruction* ins = [AVMutableVideoCompositionLayerInstruction videoCompositionLayerInstructionWithAssetTrack:videoTrack];
//            videoCompositionInstruction.layerInstructions = @[ins];
//            [instructions addObject:videoCompositionInstruction];
//            currentTime = CMTimeAdd(currentTime, timeRange.duration);
//        }
    }];
    
    //if (errorOccurred == NO) {
        AVAssetExportSession *exportSession = [[AVAssetExportSession alloc] initWithAsset:composition presetName:AVAssetExportPresetHighestQuality];
      NSString *fileName = name;
        NSString *filePath = [MKOVideoMerge documentsPathWithFilePath:fileName];
        exportSession.outputURL = [NSURL fileURLWithPath:filePath];
        exportSession.outputFileType = AVFileTypeMPEG4;
        exportSession.shouldOptimizeForNetworkUse = YES;
//
//        AVMutableVideoComposition *mutableVideoComposition = [AVMutableVideoComposition videoComposition];
//        mutableVideoComposition.instructions = instructions;
//        mutableVideoComposition.frameDuration = CMTimeMake(1, highestFrameRate);
//        mutableVideoComposition.renderSize = size;
//        exportSession.videoComposition = mutableVideoComposition;
//
//        NSLog(@"Composition Duration: %ld seconds", lround(CMTimeGetSeconds(composition.duration)));
//        NSLog(@"Composition Framerate: %d fps", highestFrameRate);
//
        void(^exportCompletion)(void) = ^{
            dispatch_async(dispatch_get_main_queue(), ^{
                if (completion) completion(exportSession.outputURL, exportSession.error);
            });
        };
        
        [exportSession exportAsynchronouslyWithCompletionHandler:^{
            switch (exportSession.status) {
                case AVAssetExportSessionStatusFailed:{
                    exportCompletion();
                    break;
                }
                case AVAssetExportSessionStatusCancelled:{
                    exportCompletion();
                    break;
                }
                case AVAssetExportSessionStatusCompleted: {
                    NSLog(@"Successfully merged video files into: %@", fileName);
                    exportCompletion();
                    break;
                }
                case AVAssetExportSessionStatusUnknown: {
                    NSLog(@"Export Status: Unknown");
                }
                case AVAssetExportSessionStatusExporting : {
                    NSLog(@"Export Status: Exporting");
                }
                case AVAssetExportSessionStatusWaiting: {
                    NSLog(@"Export Status: Wating");
                }
            };
        }];
    //}
}

+ (NSURL *)applicationDocumentsDirectory {
    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
}

+ (NSString *)documentsPathWithFilePath:(NSString *)filePath {
    return [[MKOVideoMerge applicationDocumentsDirectory].path stringByAppendingPathComponent:filePath];
}

+ (NSString *)generateFileName {
    return [NSString stringWithFormat:@"video-%@.mp4", [[NSProcessInfo processInfo] globallyUniqueString]];
}

@end
