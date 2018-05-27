//
//  HighLightView.m
//  allIn
//
//  Created by Svetoslav Popov on 27.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import "HighLightView.h"

@interface HighLightView()
@end

@implementation HighLightView

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.testLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
    [self.testLabel setText:@"I am your labelss"];
  }
  return self;
}

RCT_EXPORT_VIEW_PROPERTY(testLabel, UILabel)

@end
