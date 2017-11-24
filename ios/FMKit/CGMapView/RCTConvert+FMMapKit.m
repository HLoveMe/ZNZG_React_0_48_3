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
  FMKMapPoint point = [self FMKMapPoint:json];
  return FMKGeoCoordMake([self FMKMapGroupID:json[@"coord"]], point);
}
@end
