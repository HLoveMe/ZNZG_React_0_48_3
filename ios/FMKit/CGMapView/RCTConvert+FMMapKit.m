//
//  RCTConvert+FMMapKit.m
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/23.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTConvert+FMMapKit.h"
@implementation RCTConvert (FMMapKit)
RCT_CONVERTER(FMKDegrees, FMKDegrees, doubleValue);
RCT_CONVERTER(int, FMKMapGroupID, intValue);
+(FMKMapPoint)FMKMapPoint:(id)json{
  json = [self NSDictionary:json];
  return FMKMapPointMake(
                         [self FMKDegrees:json[@"x"]],
                         [self FMKDegrees:json[@"y"]]
                         );
}
+(FMKGeoCoord)FMKGeoCoord:(id)json{
  FMKMapPoint point = [self FMKMapPoint:json[@"mapPoint"]];
  return FMKGeoCoordMake([self FMKMapGroupID:json[@"groupID"]], point);
}
+(NSDictionary *)FMKMapPointDictionary:(FMKMapPoint)point{
  return @{@"x":@(point.x),@"y":@(point.y)};
}
+(NSDictionary *)FMKGeoCoordDictionary:(FMKGeoCoord)coord{
  NSDictionary *point = [RCTConvert FMKMapPointDictionary:coord.mapPoint];
  NSMutableDictionary *result = [NSMutableDictionary dictionary];
  result[@"mapPoint"] = point;
  result[@"groupID"] = @(coord.groupID);
  return result;
}
+(NSDictionary *)FMKModel:(FMKModel*)model{
  return @{@"groupID":model.groupID,@"title":model.title,@"englishTitle":model.englishTitle,@"FID":model.FID,@"type":model.type,@"selected":@(model.selected)};
}
+(FMKMapScaleRange)FMKMapScaleRange:(id)json{
  json = [self NSDictionary:json];
  return FMKMapScaleRangeMake([RCTConvert float:json[@"min"]], [RCTConvert float:json[@"max"]]);
}
//
+(GHModelNode*)GHModelNode:(id)json{
  if(json == nil){return nil;}
  GHModelNode *node= [GHModelNode new];
  node.coord = [RCTConvert FMKGeoCoord:json[@"coord"]];
  node.layerTag = [RCTConvert int:json[@"layerTag"]];
  node.FID = [RCTConvert NSString:json[@"FID"]];
  node.groupID = [RCTConvert NSString:json[@"groupID"]];
  return node;
}
@end
