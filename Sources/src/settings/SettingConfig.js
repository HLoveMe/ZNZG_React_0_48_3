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
   about:{getScreen:()=>{return require("./settings/SettingAboutView").default}},
   config:{getScreen:()=>{return require("./settings/SettingConfigView").default}},

},{
   initialRouteName:"setting",
   headerMode:"none",
});
