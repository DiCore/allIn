//
//  CameraView.m
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import "CameraView.h"

@interface CameraView ()

@end

@implementation CameraView

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    [self setup];
  }
  
  return self;
}

- (instancetype)initWithCoder:(NSCoder *)aDecoder {
  if (self = [super initWithCoder:aDecoder]) {
    [self setup];
  }
  
  return self;
}

- (void)setPreviewLayer:(AVCaptureVideoPreviewLayer *)previewLayer {
  [_previewLayer removeFromSuperlayer];
  
  _previewLayer = previewLayer;
  
  [self.layer addSublayer:previewLayer];
  
  [self setNeedsLayout];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  
  //self.previewLayer.frame = self.layer.bounds;
  if (self.previewLayer.connection != nil && self.previewLayer.connection.isVideoOrientationSupported) {
    UIDeviceOrientation orientation = [UIDevice currentDevice].orientation;
    switch (orientation) {
      case UIDeviceOrientationPortrait:
      case UIDeviceOrientationFaceUp:
      case UIDeviceOrientationFaceDown:
      case UIDeviceOrientationUnknown:
        [self updatePreviewLayerOrientation:AVCaptureVideoOrientationPortrait];
        break;
      case UIDeviceOrientationPortraitUpsideDown:
        [self updatePreviewLayerOrientation:AVCaptureVideoOrientationPortraitUpsideDown];
        break;
      case UIDeviceOrientationLandscapeLeft:
        [self updatePreviewLayerOrientation:AVCaptureVideoOrientationLandscapeRight];
        break;
      case UIDeviceOrientationLandscapeRight:
        [self updatePreviewLayerOrientation:AVCaptureVideoOrientationLandscapeLeft];
        break;
    }
  }
}

#pragma mark - Private methods

- (void)setup {
  
}

- (void)updatePreviewLayerOrientation:(AVCaptureVideoOrientation)orientation {
  self.previewLayer.connection.videoOrientation = orientation;
  self.previewLayer.frame = self.bounds;
}

@end
