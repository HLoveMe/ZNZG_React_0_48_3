//
//  RCTConvert+FMMapKit.h
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/23.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTConvert.h>
#import "FMKMap.h"
#import "GHModelNode.h"
@interface RCTConvert (FMMapKit)
+(FMKMapPoint)FMKMapPoint:(id)json;
+(FMKGeoCoord)FMKGeoCoord:(id)json;
+(FMKMapScaleRange)FMKMapScaleRange:(id)json;
+(NSDictionary *)FMKMapPointDictionary:(FMKMapPoint)point;
+(NSDictionary *)FMKGeoCoordDictionary:(FMKGeoCoord)coord;

//

+(GHModelNode*)GHModelNode:(id)json;
@end
