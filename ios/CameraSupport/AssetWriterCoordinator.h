//
//  AssetWriterCoordinator.h
//  VideoCaptureDemo
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreMedia/CoreMedia.h>
#import <AVFoundation/AVFoundation.h>

@protocol AssetWriterCoordinatorDelegate;

@interface AssetWriterCoordinator : NSObject

- (instancetype)initWithURL:(NSURL *)URL;
- (void)addVideoTrackWithSourceFormatDescription:(CMFormatDescriptionRef)formatDescription settings:(NSDictionary *)videoSettings;
- (void)addAudioTrackWithSourceFormatDescription:(CMFormatDescriptionRef)formatDescription settings:(NSDictionary *)audioSettings;
- (void)setDelegate:(id<AssetWriterCoordinatorDelegate>)delegate callbackQueue:(dispatch_queue_t)delegateCallbackQueue;

- (void)prepareToRecord;
- (void)appendVideoSampleBuffer:(CMSampleBufferRef)sampleBuffer;
- (void)appendAudioSampleBuffer:(CMSampleBufferRef)sampleBuffer;
- (void)finishRecording;

@end


@protocol AssetWriterCoordinatorDelegate <NSObject>

- (void)writerCoordinatorDidFinishPreparing:(AssetWriterCoordinator *)coordinator;
- (void)writerCoordinator:(AssetWriterCoordinator *)coordinator didFailWithError:(NSError *)error;
- (void)writerCoordinatorDidFinishRecording:(AssetWriterCoordinator *)coordinator;

@end
