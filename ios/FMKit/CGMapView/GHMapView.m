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
#import "FMKMap.h"
#import "RCTConvert+FMMapKit.h"
@protocol _FMKLayerDelegate<NSObject>
-(BOOL)onMapClickNode:(FMKNode *)node inLayer:(FMKLayer *)layer gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer;
@end
@interface GHMapView()
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
#pragma -mark FMKLayerDelegate
-(void)onMapClickNode:(FMKNode *)node inLayer:(FMKLayer *)layer gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer{
  if([self.mapDelegate respondsToSelector:@selector(onMapClickNode:inLayer:gestureRecognizer:)]){
    BOOL result = [((id<_FMKLayerDelegate>)self.mapDelegate) onMapClickNode:node inLayer:layer gestureRecognizer:gestureRecognizer];
    if(self.onMapNodeClick){
      NSMutableDictionary *_result = [NSMutableDictionary dictionary];
      if(result){
        _result[@"FID"] = [(FMKModel *)node FID];
        _result[@"layerTag"] = @(layer.layerTag);
        FMKModel *modal = (FMKModel *)node;
        FMKGeoCoord coord = [modal getModelCenterByMapPath:self.map.dataPath];
        _result[@"coord"] = [RCTConvert FMKGeoCoordDictionary:coord];
        _result[@"groupID"] = modal.groupID;
      }
      self.onMapNodeClick(_result);
    }
  }else{
    NSLog(@"地图代理也要实现onMapClickNode:inLayer:gestureRecognizer:");
  }
}
@end
