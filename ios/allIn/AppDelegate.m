/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "PermissionsManager.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTRootViewDelegate.h>

@interface AppDelegate () <RCTRootViewDelegate>
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"allIn"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  rootView.delegate = self;

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [self checkPermissions];
  
  return YES;
}

- (void)checkPermissions
{
  PermissionsManager *pm = [PermissionsManager new];
  [pm checkCameraAuthorizationStatusWithBlock:^(BOOL granted) {
    if(!granted){
      NSLog(@"no camera persmissions");
    }
    
    [pm checkMicrophonePermissionsWithBlock:^(BOOL granted) {
      if(!granted){
        NSLog(@"no mic permissions");
      }
    }];
  }];
}

- (void)rootViewDidChangeIntrinsicSize:(RCTRootView *)rootView {  
  [[NSNotificationCenter defaultCenter] postNotificationName:@"rootViewResize" object:nil];
}

@end
