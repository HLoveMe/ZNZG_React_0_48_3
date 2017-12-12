/**
 * Created by zhuzihao on 2017/12/12.
 */
import React, { Component } from 'react';
import { StyleSheet, View ,Text,Image,SectionList,TouchableHighlight } from 'react-native';
import BaseContentView from "../../Base/BaseContentView"
import SettingCellView from "./../../Tools/Views/SettingCellView"
const ConfigStyle = StyleSheet.create({
   container:{
       borderWidth:1,
       borderColor:"red",
       height:44
   }
});

export  default class  SettingConfigView extends Component{
    constructor(ops){
        super(ops);
    }
    render() {
        return (
            <BaseContentView title={"设置"}
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >
                <View style = { [ConfigStyle.container,{marginTop:20}] }>

                </View>
                <View style = { [ConfigStyle.container] }>

                </View>
                <SettingCellView lineStyle = {{left:44}}
                                 titleStyle={{color:"red",fontSize:19}}
                                 accessory = {true}
                                 accessoryView={
                                     (<Text style = {{color:"blue"}}>aaa</Text>)
                                 }
                >

                </SettingCellView>
            </BaseContentView>
        )
    }
}