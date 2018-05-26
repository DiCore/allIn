//
//  IDCaptureSessionMovieFileOutputCoordinator.m
//  VideoCaptureDemo
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import "CaptureSessionMovieFileOutputCoordinator.h"
#import "FileManager.h"
#import <UIKit/UIKit.h>

@interface CaptureSessionMovieFileOutputCoordinator () <AVCaptureFileOutputRecordingDelegate, AVCapturePhotoCaptureDelegate>

@property (nonatomic, strong) AVCaptureMovieFileOutput *movieFileOutput;
@property (nonatomic, strong) AVCapturePhotoOutput *photoOutput;

@end

@implementation CaptureSessionMovieFileOutputCoordinator

- (instancetype)init {
    self = [super init];
    if(self){
      [self addMovieFileOutputToCaptureSession:self.captureSession];
      [self addPhotoCaptureOutputToCaptureSession:self.captureSession];
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

- (void)capturePhoto {
#if TARGET_OS_SIMULATOR
#else
  AVCapturePhotoSettings *settings = [AVCapturePhotoSettings new];
  AVCaptureConnection *connection = [_photoOutput connectionWithMediaType:AVMediaTypeVideo];
  UIDeviceOrientation orientation = [UIDevice currentDevice].orientation;
  switch (orientation) {
    case UIDeviceOrientationPortrait:
    case UIDeviceOrientationFaceUp:
    case UIDeviceOrientationFaceDown:
    case UIDeviceOrientationUnknown:
      connection.videoOrientation = AVCaptureVideoOrientationPortrait;
      break;
    case UIDeviceOrientationPortraitUpsideDown:
      connection.videoOrientation = AVCaptureVideoOrientationPortraitUpsideDown;
      break;
    case UIDeviceOrientationLandscapeLeft:
      connection.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
      break;
    case UIDeviceOrientationLandscapeRight:
      connection.videoOrientation = AVCaptureVideoOrientationLandscapeLeft;
      break;
  }  
  [_photoOutput capturePhotoWithSettings:settings delegate:self];
  
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

#pragma mark - AVCapturePhotoCaptureDelegate methods

- (void) captureOutput:(AVCapturePhotoOutput *)output didFinishProcessingPhotoSampleBuffer:(CMSampleBufferRef)photoSampleBuffer previewPhotoSampleBuffer:(CMSampleBufferRef)previewPhotoSampleBuffer resolvedSettings:(AVCaptureResolvedPhotoSettings *)resolvedSettings bracketSettings:(AVCaptureBracketedStillImageSettings *)bracketSettings error:(NSError *)error {
  
  if (error != nil || photoSampleBuffer == nil /* || previewPhotoSampleBuffer == nil */) {
    NSLog(@"Error %@", error);
    return;
  }
  
  NSData *dataImage = [AVCapturePhotoOutput JPEGPhotoDataRepresentationForJPEGSampleBuffer:photoSampleBuffer previewPhotoSampleBuffer:previewPhotoSampleBuffer];
  if (dataImage == nil) {
    NSLog(@"Error data image");
    return;
  }
  
  UIImage *image = [UIImage imageWithData:dataImage];
  [self.delegate coordinator:self didCapturePhoto:image];
}

@end

