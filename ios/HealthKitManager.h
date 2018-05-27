//
//  HealthKitManager.h
//  HKTest
//
//  Created by Svetoslav Popov on 26.05.18.
//  Copyright © 2018 personal. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <HealthKit/HealthKit.h>

@interface HealthKitManager : NSObject

@property(strong, nonatomic) HKHealthStore* healthStore;

+ (HealthKitManager *)sharedManager;


- (void)getStepsCountFromTimeInterval:(NSTimeInterval)timeInterval completion: (void (^)(NSInteger stepsCount, NSError *error))completion;
- (double)getCaloriesCountFromTimeInterval:(NSTimeInterval)timeInterval;
- (void)getHeartRateMonitorValueWithTimeInterval:(NSTimeInterval)timeInterval completion: (void (^)(NSInteger stepsCount, NSError *error))completion;
@end
