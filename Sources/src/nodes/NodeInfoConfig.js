/**
 * Created by zhuzihao on 2017/11/28.
 */

import { StackNavigator } from "react-navigation";
import NodeInfoView from "./NodeInfoView";

export const NodeNavigator = StackNavigator({
    nodeInfo:{screen:NodeInfoView},
},{
    initialRouteName:"nodeInfo",
    headerMode:"none",
});
