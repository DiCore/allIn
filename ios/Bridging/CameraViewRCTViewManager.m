//
//  CameraViewRCTViewManager.m
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "CameraViewRCTViewManager.h"
#import "CameraView.h"

@implementation CameraViewRCTViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[CameraView alloc] init];
}

@end
