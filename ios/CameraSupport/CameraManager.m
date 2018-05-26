//
//  CameraManager.m
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "CameraManager.h"

@implementation CameraManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(generateHighlight:(int)seconds)
{
  NSLog(@"HIGHLIGHT GENERATE %d", seconds);
}

@end
