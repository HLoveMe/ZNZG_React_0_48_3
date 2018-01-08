/**
 * Created by zhuzihao on 2017/11/28.
 */


import NodeInfoView from "./NodeInfoView";
import { Navigationer } from "../Base/Navigation"

export const NodeNavigator = Navigationer({
    nodeInfo:{ screen:NodeInfoView },
    nodeInfoDetail:{getScreen:()=>{return require("./NodeInfoDetailView").default}},
    nodeBespeak:{getScreen:()=>{return require("./NodeBespeakView").default}},
    nodeBespeakState:{getScreen:()=>{return require("./NodeBespeakResultView").default}}
},{
    initialRouteName:"nodeInfo",
    headerMode:"none",
});
