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
#import "FMKMap.h"
#import "FMKMapInfo.h"
#import "GHMapView.h"
#import "FMKModelLayer.h"
#import "FMKNode.h"
#import "FMKModel.h"
#import "FMKMapStatus.h"
#import "RCTConvert+FMMapKit.h"
static NSString *MapID =  @"sapce-2017";
static NSString *ThemeID = @"4008";
static NSString *FMMAPKEY = @"02feb8cee9aef3fc2cf082292539cbfc";

@interface GHMapViewManager()<FMKMapViewDelegate,FMKSearchAnalyserDelegate>
@property (nonatomic, copy) RCTResponseSenderBlock seachBlock;
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
//设置地图状态
RCT_CUSTOM_VIEW_PROPERTY(MapStatus, NSDictionary, GHMapView){
  NSDictionary *status = [RCTConvert NSDictionary:json];
  if(status==nil)return;
  NSArray *keys = status.allKeys;
  FMKMapStatus *State = view.map.mapStatus;
  if([keys containsObject:@"inclineAngle"]){
      float angle = [RCTConvert float:status[@"inclineAngle"]];
      State.inclineAngle = angle;
  }
  if([keys containsObject:@"rotateAngle"]){
    float angle = [RCTConvert float:status[@"rotateAngle"]];
    State.rotateAngle = angle;
  }
  
  if([keys containsObject:@"zoomRange"]){
    State.zoomRange = [RCTConvert FMKMapScaleRange:status[@"zoomRange"]];
  }
  if([keys containsObject:@"zoomLevel"]){
    int angle = [RCTConvert int:status[@"zoomLevel"]];
    [view.map setZoomLevel:angle animated:false];
  }
  if([keys containsObject:@"rulerRatio"]){
    CGFloat angle = [RCTConvert CGFloat:status[@"rulerRatio"]];
    [view.map setRulerRatio:angle];
  }
}
//设置地图当前ID
RCT_EXPORT_METHOD(setCurrentID:(nonnull NSNumber*)reactTag
                  ID:(NSString*)Id){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    UIView *view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      [(GHMapView *)view setFocusByGroupID:Id animated:YES];
    }else{
      RCTLogError(@"GHMapViewManager %@ setCurrentID Error",reactTag);
    }
  }];
}
//得到所有楼层
RCT_EXPORT_METHOD(getDisplayIDs:(nonnull NSNumber*)reactTag
                  back:(RCTResponseSenderBlock)handle){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      handle(@[[(GHMapView *)view displayGroupIDs]]);
    }else{
      RCTLogError(@"GHMapViewManager %@ getDisplayIDs Error",reactTag);
    }
  }];
}
//得到地图中心点
RCT_EXPORT_METHOD(getMapCenter:(nonnull NSNumber*)reactTag
                  back:(RCTResponseSenderBlock)handle){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      FMKMapPoint point = [(GHMapView *)view getMapViewCenter];
      handle(@[@{@"x":@(point.x),@"y":@(point.y)}]);
    }else{
      RCTLogError(@"GHMapViewManager %@ getDisplayIDs Error",reactTag);
    }
  }];
}
//当前的ID
RCT_EXPORT_METHOD(getCurrentDisplayID:(nonnull NSNumber*)reactTag
                  back:(RCTResponseSenderBlock)handle){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      handle(@[[((GHMapView *)view) getFocusGroupID]]);
    }else{
      RCTLogError(@"GHMapViewManager %@ getDisplayIDs Error",reactTag);
    }
  }];
}
//开始地图定位
RCT_EXPORT_METHOD(startLocation:(nonnull NSNumber*)reactTag){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      GHMapView *mapV = (GHMapView *)view;
      FMKLocationLayer *locaLayer = mapV.map.locationLayer;
      FMKLocationMarker *maker = [[FMKLocationMarker alloc]initWithPointerImageName:@"active.png" DomeImageName:@""];
      [locaLayer addMarker:maker];
      maker.size = CGSizeMake(20, 20);
      [maker locateWithGeoCoord:FMKGeoCoordMake([[mapV getFocusGroupID] intValue], [mapV getMapViewCenter])];
      [maker updateRotate:0];
    }else{
      RCTLogError(@"GHMapViewManager %@ startLocation Error",reactTag);
    }
  }];
}
//搜索
RCT_EXPORT_METHOD(Search:(nonnull NSNumber *)reactTag key:(NSString *)word back:(RCTResponseSenderBlock)handle){
  if(handle == nil){return;}
  self.seachBlock = handle;
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      GHMapView *mapV = (GHMapView *)view;
      FMKModelSearchRequest *request =[[FMKModelSearchRequest alloc] init];
      request.groupIDs = @[[mapV getFocusGroupID]];
      request.keywords = word;
      FMKSearchAnalyser *search = [[FMKSearchAnalyser alloc]initWithDataPath:[mapV.map dataPath]];
      
      search.delegate = self;
      [search executeFMKSearchRequestByKeyWords:request];
    }else{
      RCTLogError(@"GHMapViewManager %@ Search Error",reactTag);
    }
  }];
}
//更新我的位置
RCT_EXPORT_METHOD(updateLocation:(nonnull NSNumber*)reactTag location:(FMKGeoCoord)loca angle:(CGFloat)angle){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      GHMapView *mapV = (GHMapView *)view;
      FMKLocationLayer *locaLayer = mapV.map.locationLayer;
      FMKLocationMarker *maker = [[locaLayer subNodes] firstObject];
      [maker updateRotate:angle];
      [maker locateWithGeoCoord:loca];
    }else{
      RCTLogError(@"GHMapViewManager %@ updateLocation Error",reactTag);
    }
  }];
}
//聚焦Node位置
RCT_EXPORT_METHOD(focusNode:(nonnull NSNumber *)reactTag FID:(NSString*)fid){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      GHMapView *mapV = (GHMapView *)view;
      FMKModelLayer *layer = [mapV.map getModelLayerByGroupID:[mapV getFocusGroupID]];
      FMKModel *modal = [layer queryModelByFID:fid];
      FMKGeoCoord ceter = [modal getModelCenterByMapPath:[mapV.map dataPath]];
      [mapV moveToViewCenterFromMapPoint:ceter.mapPoint animated:false];
    }else{
      RCTLogError(@"GHMapViewManager %@ focusNode Error",reactTag);
    }
  }];
}
//导出主动事件
RCT_EXPORT_VIEW_PROPERTY(onFinishloading, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onFailloading, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onMapNodeClick, RCTBubblingEventBlock);
#pragma -mark 协议方法
- (void)mapViewDidFinishLoadingMap:(GHMapView *)mapView{
  //如果是本地 或者已经缓存 为同步 完成  js 对象还么初始化
  //设置初始状态
  for (NSString * one in [mapView displayGroupIDs]){
    FMKModelLayer *modelLayer = [mapView.map getModelLayerByGroupID:one];
    modelLayer.delegate = mapView;
  }
  
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if(mapView.onFinishloading){
      FMKMapPoint point = [mapView getMapViewCenter];
      FMKMap *_map = mapView.map;
      mapView.onFinishloading(@{
                                @"mapCenter":@{@"x":@(point.x),@"y":@(point.y)},
                                @"currentID":mapView.getFocusGroupID,
                                @"displayIDs":[mapView displayGroupIDs],
                                @"mapInfo":@{
                                      @"mapID":_map.ID,
                                      @"rulerRatio":@(_map.rulerRatio),
                                      @"info":@{
                                            @"name":_map.info.name,
                                            @"minX":@(_map.info.minX),
                                            @"minY":@(_map.info.minY),
                                            @"maxX":@(_map.info.maxX),
                                            @"maxY":@(_map.info.maxY),
                                            @"height":@(_map.info.height),
                                            @"fmapVersion":_map.info.fmapVersion
                                          },
                                    }
                                });
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
#pragma -mark FMKLayerDelegate
-(BOOL)onMapClickNode:(FMKNode *)node inLayer:(FMKLayer *)layer gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer{
  if([layer isKindOfClass:[FMKModelLayer class]]){
    return YES;
  }
  return NO;
}
#pragma -mark 模型查询
- (void)onModelSearchDone:(FMKModelSearchRequest *)request result:(NSArray *)resultArray distances:(NSArray *)distances{
  NSArray* res = resultArray.count >=3 ? [resultArray subarrayWithRange:NSMakeRange(0, 3)] : resultArray;
  NSMutableArray *_res = [NSMutableArray array];
  for (FMKModelSearchResult *one in res){
    [_res addObject:@{@"FID":one.FID,@"name":one.name}];
  }
  if(self.seachBlock){
    self.seachBlock(@[_res]);
  }
}
@end
