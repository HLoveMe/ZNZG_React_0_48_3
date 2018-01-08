//
//  GHMapNodeManager.m
//  ZNZG_React_0_48_3
//
//  Created by 朱子豪 on 2017/11/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "GHMapNodeManager.h"
#import <React/RCTUIManager.h>
#import "GHMapView.h"
#import "GHModelNode.h"
#import "RCTConvert+FMMapKit.h"
@interface GHMapNodeManager()
@end
@implementation GHMapNodeManager
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(selectNode:(nonnull NSNumber *)reactTag current:(GHModelNode*)current pre:(GHModelNode*)pre){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    UIView *view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      GHMapView *mapV  = (GHMapView *)view;
      FMKModel *modal = [[mapV.map getModelLayerByGroupID:current.groupID] queryModelByFID:current.FID];
      modal.selected = true;
      FMKModel *_pre = [[mapV.map getModelLayerByGroupID:pre.groupID] queryModelByFID:pre.FID];
      _pre.selected = false;
    }else{
      RCTLogError(@"GHMapNodeManager %@ selectNode Error",reactTag);
    }
  }];
}

RCT_EXPORT_METHOD(getNodeCenter:(nonnull NSNumber *)reactTag node:(NSString *)FID handle:(RCTResponseSenderBlock)handle){
  if(handle==nil){return;}
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    UIView *view = viewRegistry[reactTag];
    if([view isKindOfClass:[GHMapView class]]){
      GHMapView *mapV  = (GHMapView *)view;
      FMKModelLayer *layer = [mapV.map getModelLayerByGroupID:[mapV getFocusGroupID]];
      FMKModel *modal = [layer queryModelByFID:FID];
      FMKGeoCoord ceter = [modal getModelCenterByMapPath:[mapV.map dataPath]];
      handle(@[[RCTConvert FMKGeoCoordDictionary:ceter]]);
    }else{
      RCTLogError(@"GHMapNodeManager %@ getNodeCenter Error",reactTag);
    }
  }];
}
@end
