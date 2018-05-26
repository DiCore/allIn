//
//  CameraManager.h
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@class CameraView;

@interface CameraManager : RCTEventEmitter <RCTBridgeModule>

+ (CameraView *)cameraView;

@end
