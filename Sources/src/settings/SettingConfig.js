/**
 * Created by zhuzihao on 2017/11/27.
 */
import { StackNavigator } from "react-navigation";
import  SettingMainView  from "./SettingMainView";

export const SettingNavigator = StackNavigator({
   setting:{screen:SettingMainView},
   bespeak:{getScreen:()=>{return require("./settings/SettingBespeakView").default}},
   message:{getScreen:()=>{return require("./settings/SettingMessageView").default}},
},{
   initialRouteName:"setting",
   headerMode:"none",
});
