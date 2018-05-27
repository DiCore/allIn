//
//  HealthKitManager.m
//  HKTest
//
//  Created by Svetoslav Popov on 26.05.18.
//  Copyright © 2018 personal. All rights reserved.
//

#import "HealthKitManager.h"

@interface HealthKitManager()

@end

@implementation HealthKitManager

+ (HealthKitManager *)sharedManager {
    static dispatch_once_t pred = 0;
    static HealthKitManager *instance = nil;
    dispatch_once(&pred, ^{
        instance = [[HealthKitManager alloc] init];
        instance.healthStore = [[HKHealthStore alloc] init];
    });
    
    return instance;
}

- (void)getStepsCountFromTimeInterval:(NSTimeInterval)timeInterval completion: (void (^)(NSInteger stepsCount, NSError *error))completion {
    NSCalendar *calendar = [NSCalendar currentCalendar];
    
    NSDate *startDate = [NSDate dateWithTimeIntervalSinceNow:-timeInterval];
    NSDate *currentDate = [NSDate date];
    NSDateComponents *intervalComponents = [calendar components: NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay | NSCalendarUnitHour | NSCalendarUnitMinute | NSCalendarUnitSecond
                                                      fromDate: startDate toDate: currentDate options: 0];
    
    intervalComponents.day = 1;
    
    HKQuantityType *quantityType = [HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount];
    
    // Create the query
    HKStatisticsCollectionQuery *query = [[HKStatisticsCollectionQuery alloc] initWithQuantityType:quantityType
                                                                           quantitySamplePredicate:nil
                                                                                           options:HKStatisticsOptionCumulativeSum
                                                                                        anchorDate:startDate
                                                                                intervalComponents:intervalComponents];
    
    // Set the results handler
    query.initialResultsHandler = ^(HKStatisticsCollectionQuery *query, HKStatisticsCollection *results, NSError *error) {
        if (error) {
            // Perform proper error handling here
            NSLog(@"*** An error occurred while calculating the statistics: %@ ***",error.localizedDescription);
        }
        
        __block NSInteger stepsCounter = 0;
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(1);
        
        [results enumerateStatisticsFromDate:startDate
                                      toDate:currentDate
                                   withBlock:^(HKStatistics *result, BOOL *stop) {
                                       
                                       HKQuantity *quantity = result.sumQuantity;
                                       if (quantity) {
                                           double value = [quantity doubleValueForUnit:[HKUnit countUnit]];
                                          
                                           stepsCounter = stepsCounter + ((NSInteger)value);
                                       }
                                       
                                       dispatch_semaphore_signal(semaphore);
                                   }];
        
        dispatch_semaphore_wait(semaphore, 15);
        completion(stepsCounter, nil);
    };
    
    [self.healthStore executeQuery:query];
}

- (double)getCaloriesCountFromTimeInterval:(NSTimeInterval)timeInterval {

    double prancerciseCaloriesPerHour = 450;
    double hours = timeInterval / 3600;
    double totalCalories = prancerciseCaloriesPerHour*hours;
    
    return totalCalories;
}

- (void)getHeartRateMonitorValueWithTimeInterval:(NSTimeInterval)timeInterval completion: (void (^)(NSInteger stepsCount, NSError *error))completion {
    uint32_t arc4Rand = arc4random();
    NSInteger beats = 90 + arc4Rand % (arc4Rand-90+1);  // MAX(arc4random() % 100, 91) ;
//    (int)from + arc4random() % (to-from+1);
    completion(beats, nil);
}

@end
