//
//  CameraView.m
//  allIn
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "CameraView.h"

@interface CameraView ()

@property (nonatomic, strong) UIView* v;

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

- (void)layoutSubviews {
  [super layoutSubviews];
  
  self.v.frame = CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height);
}

- (void)setup {
  self.v = [UIView new];
  [self.v setTranslatesAutoresizingMaskIntoConstraints:NO];
  self.v.backgroundColor = [UIColor redColor];
  [self addSubview:self.v];
}

@end
