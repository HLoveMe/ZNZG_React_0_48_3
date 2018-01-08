//
//  GHNode.h
//  ZNZG_React_0_48_3
//
//  Created by 朱子豪 on 2017/11/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FMMapKit.h"
@interface GHModelNode : NSObject
@property(nonatomic,assign)FMKGeoCoord coord;
@property(nonatomic,assign)int layerTag; //针对自定义Layer
@property(nonatomic,copy)NSString *FID;
@property(nonatomic,copy)NSString *groupID;
@end
