//
//  CameraViewRCTViewManager.m
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import "CameraViewRCTViewManager.h"
#import "CameraView.h"
#import "CameraManager.h"

@interface CameraViewRCTViewManager ()

@end

@implementation CameraViewRCTViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [CameraManager cameraView];
}

@end
