//
//  WatchManager.m
//  allIn
//
//  Created by Svetoslav Popov on 26.05.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "WatchManager.h"
#import <WatchConnectivity/WatchConnectivity.h>

@interface WatchManager() <WCSessionDelegate>
@property (nonatomic, strong) WCSession* session;
@end

@implementation WatchManager

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.session = WCSession.defaultSession;
    self.session.delegate = self;
    [self.session activateSession];
  }
  return self;
}

#pragma mark: WCSessionDelegate
//- (void)session:(WCSession *)session didReceiveMessage:(NSDictionary<NSString *,id> *)message {
//  
//  NSLog(@"Message received: %@", message[@"take"]);
//}

- (void)session:(WCSession *)session activationDidCompleteWithState:(WCSessionActivationState)activationState error:(NSError *)error {
  NSLog(@"");
}

- (void)sessionDidBecomeInactive:(WCSession *)session {
  NSLog(@"");
}

- (void)sessionDidDeactivate:(WCSession *)session {
  NSLog(@"");
}

- (void)sessionWatchStateDidChange:(WCSession *)session {
  NSLog(@"");
}


//yea, a nil replyHandler is ok but in that case your WCSession delegate should be implementing:
- (void)session:(WCSession *)session didReceiveMessage:(NSDictionary<NSString *, id> *)message {
}

//which I'm guessing you weren't, and instead you had implemented:
- (void)session:(WCSession *)session didReceiveMessage:(NSDictionary<NSString *, id> *)message replyHandler:(void(^)(NSDictionary<NSString *, id> *replyMessage))replyHandler {
  [[NSNotificationCenter defaultCenter] postNotificationName:ALL_IN_WATCH_BUTTON_TAPPED_NOTIFICATION_NAME object:nil];
}


@end
