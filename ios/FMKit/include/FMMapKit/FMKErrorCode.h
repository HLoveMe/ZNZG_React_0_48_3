//
//  FMKErrorCode.h
//  FMMapKit
//
//  Created by fengmap on 2017/3/10.
//  Copyright © 2017年 Fengmap. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 Fengmap错误码

 - FMKErrorCode_NET_ERROR: 网络错误
 - FMKErrorCode_KEY_ERROR: key错误
 - FMKErrorCode_MAPID_ERROR: mapID错误
 - FMKErrorCode_NO_PERMISSION: 没有权限访问数据
 - FMKErrorCode_KEY_NO_MATCH_BUNDLEID: key与bundleID不匹配
 - FMKErrorCodeType_MAPDATA_PARSE_ERROR: 地图数据解析失败
 - FMKErrorCodeType_DOWNLOAD_ERROR: 地图数据下载失败
 - FMKErrorCodeType_NO_VERSION_INFO: 没有版本号错误
 - FMKErrorCodeType_MAP_DATA_DIRECTORY_ERROR: 地图文件路径错误
 - FMKErrorCodeType_UNKNOWN_ERROR: 发生未知错误
 */
typedef NS_ENUM(NSInteger, FMKErrorCodeType) {
    FMKErrorCode_NET_ERROR               = 1,
    FMKErrorCode_KEY_ERROR               = 2,
    FMKErrorCode_MAPID_ERROR             = 3,
    FMKErrorCode_NO_PERMISSION           = 4,
    FMKErrorCode_KEY_NO_MATCH_BUNDLEID   = 5,
    FMKErrorCodeType_MAPDATA_PARSE_ERROR = 6,
    FMKErrorCodeType_DOWNLOAD_ERROR      = 7,
    FMKErrorCodeType_NO_VERSION_INFO     = 8,
	FMKErrorCodeType_MAP_DATA_DIRECTORY_ERROR = 9,
    FMKErrorCodeType_UNKNOWN_ERROR       = 10

};

@interface FMKErrorCode : NSObject

@end
