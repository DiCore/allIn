//
//  CameraManager.m
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import "CameraManager.h"
#import "CameraView.h"

@interface CameraManager ()

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

RCT_EXPORT_METHOD(generateHighlight:(int)seconds)
{
  NSLog(@"HIGHLIGHT GENERATE %d", seconds);
  
  
}

@end
