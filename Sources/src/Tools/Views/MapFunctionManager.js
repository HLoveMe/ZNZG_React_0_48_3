/**
 * Created by zhuzihao on 2017/11/24.
 */

import { NativeModules,findNodeHandle} from 'react-native';
const { GHMapViewManager  } = NativeModules;

export class MapFunctionManager{
    constructor(map){
        this.map  = map;
    }
}