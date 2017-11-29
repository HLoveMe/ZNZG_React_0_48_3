/**
 * Created by zhuzihao on 2017/11/27.
 */

import React, { Component } from 'react';
import { StyleSheet, View ,Text,Image,SectionList,TouchableHighlight } from 'react-native';
import BaseContentView from "../Base/BaseContentView"
import PXHandle from "../Tools/PXHandle"
const SettingStyle = StyleSheet.create({
    content:{

    },
    Footer:{
        height:PXHandle.PXHeight(103),
        justifyContent: 'center',
        alignItems:"center",
    },
    Cell:{
        height:PXHandle.PXHeight(94),
        flex: 1,
        justifyContent: 'center',

    },
    CellIcon:{
        position:"absolute",
        left:20
    },
    CellTitle:{
        paddingLeft:50,

    },
    FooterLine:{
        height:1,
        backgroundColor:"#f5f5f5",
        width:"90%",
    }

});
export default class SettingMainView extends Component{
    constructor(ops){
        super(ops);
        this.state= {setting:[{rows:[{title:"预约"}, {title:"消息"}, { title:"资料"}],footer:true},{rows:[{title:"足迹"}],footer:true},{rows:[{title:"设置"},{ title:"关于"}],footer:false}]};
    }
    componentDidMount(){

    }
    _navigation = (group,index)=>{
        if(group == 0){
            if(index == 0){
                this.props.navigation.navigate("bespeak");
            }else if(index == 1){
                this.props.navigation.navigate("message");
            }
        }

    };
    _renderItem = (group)=>{
      return ({index,item})=>{
          let imgR;
          if(group == 0){
              if(index == 0){imgR = require("../../../images/my_time.png");}else if(index==1){imgR = require("../../../images/my_message.png");
              }else{imgR = require("../../../images/my_books.png");}
          }else if(group == 1){imgR = require("../../../images/my_spoor.png");
          }else{
              if(index == 0){imgR = require("../../../images/my_setting.png");
              }else{imgR = require("../../../images/my_about.png");}
          }
          return (
          <TouchableHighlight onPress={()=>this._navigation(group,index)}
                              underlayColor = {"white"}
          >
              <View style={ SettingStyle.Cell }>
                  <Text style={ SettingStyle.CellTitle }>{item.title}</Text>
                  <Image style={ SettingStyle.CellIcon } source={ imgR }
                  >
                  </Image>
              </View>
          </TouchableHighlight>
          )
      }
    };
    _renderSection = ()=>{
        let sets = [];
        for (var index in this.state.setting){
            let one = this.state.setting[index];
            sets.push({
                data:one.rows,
                footer:one.footer,
                key:"Section"+`${index}`,
                renderItem:this._renderItem(index),
            })
        }
        return sets;
    };
    render(){
        return (
            <BaseContentView title={"我的"}
                             dismiss={ this.props.screenProps.dismiss }
            >
                <View style={SettingStyle.content}>
                    <SectionList sections={
                                    this._renderSection()
                                 }

                                 keyExtractor={
                                     (item,index)=>{
                                         return  `${index}` + item.title;
                                     }
                                 }
                                 renderSectionFooter = {
                                     ({section})=>{
                                         if(!section.footer){return null;}
                                         return (
                                             <View style={ SettingStyle.Footer }>
                                                 <View style={SettingStyle.FooterLine}></View>
                                             </View>
                                         )
                                     }
                                 }
                                 extraData = { this.state }

                    >

                    </SectionList>
                </View>
            </BaseContentView>
        )
    }
}