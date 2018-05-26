//
//  IDCaptureSessionMovieFileOutputCoordinator.m
//  VideoCaptureDemo
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import "CaptureSessionMovieFileOutputCoordinator.h"
#import "FileManager.h"

@interface CaptureSessionMovieFileOutputCoordinator () <AVCaptureFileOutputRecordingDelegate>

@property (nonatomic, strong) AVCaptureMovieFileOutput *movieFileOutput;
@property (nonatomic, strong) AVCapturePhotoOutput *photoOutput;

@end

@implementation CaptureSessionMovieFileOutputCoordinator

- (instancetype)init {
    self = [super init];
    if(self){
      [self addMovieFileOutputToCaptureSession:self.captureSession];
      //[self addPhotoCaptureOutputToCaptureSession:self.captureSession];
    }
    return self;
}

#pragma mark - Private methods

- (BOOL)addMovieFileOutputToCaptureSession:(AVCaptureSession *)captureSession {
    self.movieFileOutput = [AVCaptureMovieFileOutput new];
    return  [self addOutput:_movieFileOutput toCaptureSession:captureSession];
}

- (BOOL)addPhotoCaptureOutputToCaptureSession:(AVCaptureSession *)captureSession {
  self.photoOutput = [AVCapturePhotoOutput new];
  return [self addOutput:_photoOutput toCaptureSession:captureSession];
}

#pragma mark - Recording

- (void)startRecording {
#if TARGET_OS_SIMULATOR
#else
    FileManager *fm = [FileManager new];
    NSURL *tempURL = [fm tempFileURL];
    [_movieFileOutput startRecordingToOutputFileURL:tempURL recordingDelegate:self];
#endif
}

- (void)stopRecording {
#if TARGET_OS_SIMULATOR
#else
    [_movieFileOutput stopRecording];
#endif
}

#pragma mark - AVCaptureFileOutputRecordingDelegate methods

- (void)captureOutput:(AVCaptureFileOutput *)captureOutput didStartRecordingToOutputFileAtURL:(NSURL *)fileURL
      fromConnections:(NSArray *)connections {
    [self.delegate coordinatorDidBeginRecording:self];
}

- (void)captureOutput:(AVCaptureFileOutput *)captureOutput didFinishRecordingToOutputFileAtURL:(NSURL *)outputFileURL fromConnections:(NSArray *)connections error:(NSError *)error {
    [self.delegate coordinator:self didFinishRecordingToOutputFileURL:outputFileURL error:error];
}

@end

