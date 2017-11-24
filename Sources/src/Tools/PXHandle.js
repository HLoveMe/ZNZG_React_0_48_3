/**
 * Created by zhuzihao on 2017/11/22.
 */

import { Dimensions } from "react-native"

var {height, width} = Dimensions.get('window');

export default class PXHandle{
    static ScreenWidth = width;
    static Screenheight = height;
    static  PXWidth = (px)=>{
        return px / 750.0 * width;
    }
    static PXHeight = (px)=>{
        return px / 1334.0 * height;
    }
}