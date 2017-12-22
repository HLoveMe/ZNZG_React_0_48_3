/**
 * Created by zhuzihao on 2017/12/12.
 */
import React, { Component } from 'react';
import { StyleSheet, View ,Text,Switch,Alert } from 'react-native';
import BaseContentView from "../../Base/BaseContentView"
import SettingCellView from "./../../Tools/Views/SettingCellView"
import PXHandle from "../../../src/Tools/PXHandle"
import * as CacheManager from 'react-native-http-cache';
const ConfigStyle = StyleSheet.create({
   container:{
       borderWidth:1,
       borderColor:"red",
       height:44
   }
});
export const NotifacationKey = "SettingConfigViewKey";
export  default class  SettingConfigView extends Component{
    constructor(ops){
        super(ops);
        this.state = {
            switchValue:false
        };
        storage.load({key:NotifacationKey}).then((switchValue)=>{
            this.setState({switchValue})
        });
        CacheManager.getCacheSize().then((size)=>{
            this.setState({
                cacheSize:size + "B"
            })
        })
    }
    _saveSwitch = ()=>{
        storage.save({
            key:NotifacationKey,
            data:this.state.switchValue
        })
    };
    render() {
        let height = PXHandle.PXHeight(140);
        return (
            <BaseContentView title={"设置"}
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >
                <SettingCellView cellStyle={{height:height}}
                                 title = {"推送提醒(会议/展会提醒)"}
                                 titleStyle ={{fontSize:16}}
                                 accessory={true}
                                 accessoryView={
                                     (<Switch value={this.state.switchValue}
                                                onValueChange={(switchValue)=>{
                                                    this.setState({
                                                        switchValue
                                                    },this._saveSwitch);
                                                }}
                                     ></Switch>)
                                 }

                ></SettingCellView>
                <SettingCellView cellStyle={{height:height}}
                                 title = {
                                     (
                                         <Text>
                                             清除缓存
                                             <Text style={{ color:"red" }}

                                             >{this.state.cacheSize}</Text>
                                         </Text>
                                     )
                                 }
                                 titleStyle ={{fontSize:16}}
                                 accessoryView={
                                     (<Text style = {{color:"blue"}}>aaa</Text>)
                                 }
                                 itemClick = {()=>{
                                     Alert.alert("是否清除缓存","",[
                                         {text: '取消', style: 'cancel'},
                                         {text: '清除', onPress: () => {
                                             CacheManager.clearCache();
                                             this.setState({
                                                 cacheSize:"0B"
                                             })
                                         }},
                                     ],{cancelable:false})
                                 }}
                ></SettingCellView>
            </BaseContentView>
        )
    }
}