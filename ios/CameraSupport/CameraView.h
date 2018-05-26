//
//  CameraView.h
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@interface CameraView : UIView

@property (nonatomic, strong) AVCaptureVideoPreviewLayer *previewLayer;

@end
