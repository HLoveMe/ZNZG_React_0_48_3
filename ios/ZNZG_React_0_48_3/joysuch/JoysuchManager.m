//
//  JoysuchManager.m
//  ZNZG_React_0_48_3
//
//  Created by 朱子豪 on 2017/12/13.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "JoysuchManager.h"
#import <JoysuchSDK/JoysuchSDK.h>
#import <CoreBluetooth/CoreBluetooth.h>
#import <CoreLocation/CoreLocation.h>
static NSString *JoysuchKEY = @"8272514d1d014cb3930a60fc3472419a";
static NSString *UUID = @"FDA50693-A4E2-4FB1-AFCF-C6EB07647825";
@interface JoysuchManager()<JSLocateManagerDelegate,CBCentralManagerDelegate>
@property(nonatomic,strong)CBCentralManager *bluthManager;
@property(nonatomic,strong)NSMutableDictionary *locationInfo;
@end
@implementation JoysuchManager
-(NSMutableDictionary *)locationInfo{
  if(_locationInfo == nil){
    _locationInfo = [NSMutableDictionary dictionary];
    _locationInfo[@"angule"] = 0;
    
  }
  return _locationInfo;
}
RCT_EXPORT_MODULE(JoysuchManager)
RCT_EXPORT_METHOD(start){
  dispatch_sync(dispatch_get_main_queue(), ^{
    JSLocateManager *man =[JSLocateManager sharedDefaults];
    man.decryptionKey = @"";
    man.appkey = JoysuchKEY;
    [man setOnlineMode];
    [man setLocateTimesSecond:2];
    [man initLocationLibraryWithUUIDs:@[UUID]];
    [man setDeflectionAngle:0];
    man.delegate =  self;
    [man setUploadPosition:YES];
    [man start];
    self.bluthManager = [[CBCentralManager alloc] initWithDelegate:self queue:dispatch_get_main_queue()];
    [self CBBluthOperation];
  });
}
#pragma -mark JSLocateManagerDelegate
- (void)jsLocateManagerDidUpdateLocation:(JSPosition *)location sensorInfo:(NSString *)sensorInfo{
  if(location.errorCode == 0){
    //得到定位信息
    self.locationInfo[@"x"] = @(location.x);
    self.locationInfo[@"y"] = @(location.y);
    [self sendEventWithName:@"LocationInfo" body:self.locationInfo];
  }//Discarding message for event 0 because of too many unprocessed messages
}

- (void)jsLocateManagerDidUpdateLocationManagerHeading:(CLHeading *)newHeading{
  double angule = 0;
  double cu = newHeading.magneticHeading;
  if(cu <= 90){angule = 180 - cu;}else if(cu >= 180){angule = 540 - cu;}else{angule = 3 * cu  - 180;}
  self.locationInfo[@"angule"] = @(angule);
  [self sendEventWithName:@"LocationInfo" body:self.locationInfo];
}

//蓝牙状态
-(NSArray<NSString *>*)supportedEvents{
  //蓝牙关闭   蓝牙不可用
  return @[@"PoweredOff",@"PoweredNoUsed",@"LocationInfo"];
}
-(void)CBBluthOperation{
  switch (self.bluthManager.state) {
    case CBManagerStateResetting:
    case CBManagerStateUnsupported:
    case CBManagerStateUnauthorized:
      [self sendEventWithName:@"PoweredNoUsed" body:nil];
      break;
    case CBManagerStatePoweredOff:{
      [self sendEventWithName:@"PoweredOff" body:nil];
    }
      break;
    default:
      break;
  }
}
#pragma -mark CBCentralManagerDelegate
- (void)centralManagerDidUpdateState:(CBCentralManager *)central{
    [self CBBluthOperation];
}
@end
