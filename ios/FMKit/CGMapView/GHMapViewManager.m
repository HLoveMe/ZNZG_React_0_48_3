//
//  ZMapFunctionManager.m
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/23.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "GHMapViewManager.h"
#import <React/RCTUIManager.h>
#import "FMKMapSDK.h"
#import "GHMapView.h"
static NSString *MapID =  @"sapce-2017";
static NSString *ThemeID = @"4008";
static NSString *FMMAPKEY = @"02feb8cee9aef3fc2cf082292539cbfc";
@interface GHMapViewManager()<FMKMapViewDelegate>
@end
@implementation GHMapViewManager

//往js导入模块<MapView>
RCT_EXPORT_MODULE(GHMapViewManager);
//导出视图
-(UIView *)view{
  return [[GHMapView alloc] initWithFrame:[UIScreen mainScreen].bounds ID:MapID delegate:self Bridge:self.bridge];;
}
RCT_EXPORT_VIEW_PROPERTY(showCompass, BOOL);
RCT_EXPORT_VIEW_PROPERTY(enable3D, BOOL);
RCT_EXPORT_METHOD(AA){
  NSLog(@"-=-=");
}

//导出主动事件
RCT_EXPORT_VIEW_PROPERTY(onFinishloading, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onFailloading, RCTBubblingEventBlock);
#pragma -mark 协议方法
- (void)mapViewDidFinishLoadingMap:(GHMapView *)mapView{
  //如果是本地 或者已经缓存 为同步 完成  js 对象还么初始化
  //设置初始状态
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if(mapView.onFinishloading){
      mapView.onFinishloading(@{});
    }
  });
}
- (void)mapViewDidFailLoadingMap:(GHMapView *)mapView withError:(NSError *)error{
 //如果是本地 或者已经缓存 为同步 完成  js 对象还么初始化
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if(mapView.onFailloading){
      mapView.onFailloading(@{});
    }
  });
}

@end
