//
//  ZMapView.h
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/23.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import "FMKMapView.h"
@interface GHMapView : FMKMapView
@property (nonatomic, copy) RCTBubblingEventBlock onFinishloading;
@property (nonatomic, copy) RCTBubblingEventBlock onFailloading;
- (instancetype)initWithFrame:(CGRect)frame
                           ID:(NSString *)mapID
                     delegate:(id<FMKMapViewDelegate>)target
                  Bridge:(RCTBridge *)bridge;
@end
