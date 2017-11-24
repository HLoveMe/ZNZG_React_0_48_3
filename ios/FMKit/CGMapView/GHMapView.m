//
//  ZMapView.m
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/23.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "GHMapView.h"
#import "FMKMapSDK.h"
#import "FMKMapView.h"
@interface GHMapView()<FMKMapViewDelegate>
@property(nonatomic,weak)RCTBridge *bridge;
@end
@implementation GHMapView
- (instancetype)initWithFrame:(CGRect)frame
                           ID:(NSString *)mapID
                     delegate:(id<FMKMapViewDelegate>)target
                       Bridge:(RCTBridge *)bridge{
  if(self = [super initWithFrame:frame ID:mapID delegate:target autoUpgrade:true]){
    self.bridge = bridge;
  }
  return self;
}
@end
