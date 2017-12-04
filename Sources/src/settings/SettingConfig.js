/**
 * Created by zhuzihao on 2017/11/27.
 */


import  SettingMainView  from "./SettingMainView";
import { Navigationer } from "../Base/Navigation";

export const SettingNavigator = Navigationer({
   setting:{screen:SettingMainView},
   bespeak:{getScreen:()=>{return require("./settings/SettingBespeakView").default}},
   message:{getScreen:()=>{return require("./settings/SettingMessageView").default}},
   userInfo:{getScreen:()=>{return require("./settings/SettingUserInfoView").default}},

},{
   initialRouteName:"setting",
   headerMode:"none",
});
