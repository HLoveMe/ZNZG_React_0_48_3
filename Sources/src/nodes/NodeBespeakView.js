/**
 * Created by zhuzihao on 2017/11/30.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image,Text} from 'react-native';
import {BespeakType,NodeBespeakItem,NodeBespeakUpdateModel} from "./BespeakModels"
import { SubmitItemView } from "../Tools/Views/SubmitItemView"
import BaseContentView from "../Base/BaseContentView"
import PXHandle from "../Tools/PXHandle"
const NodeBespeakStyle = StyleSheet.create({
   BespeakItem:{
       height:PXHandle.PXHeight(108),
       backgroundColor:"red",
       borderBottomWidth:1,
       borderBottomColor:"blue"
   }
});
export  default class NodeBespeakView extends Component{
    static  power = true;
    constructor(ops){
        super(ops);
        this.node  = this.props.navigation.state.params.node;
        console.log(this.node)
        this.exhibitionModel = new  NodeBespeakUpdateModel({ //提交的Model
            phone:"17688938286",
            node:this.node.title
        });
        this.items = [{type:BespeakType.Content,requird:true,name:"姓名",icon:"SignUp_Icon_User@2x.png",placeContent:"请输入预约姓名(必填)",default:"",canEdit:true,property:"name"}
            , {type:BespeakType.Content,requird:false,name:"公司",icon:"SignUp_Icon_Company@2x.png",placeContent:"请输入预约人所在公司(选填)",default:"",canEdit:true,property:"company"}
            , {type:BespeakType.Content,requird:false,name:"职位",icon:"SignUp_Icon_Job@2x.png",placeContent:"请输入职位(选填)",default:"",canEdit:true,property:"position"}
            , {type:BespeakType.Number,requird:true,name:"电话",icon:"SignUp_Icon_Cellphone@2x.png",placeContent:"请输入预约人电话(必填)",default:this.exhibitionModel.phone,canEdit:true,property:"phone"}
            , {type:BespeakType.Content,requird:true,name:"预约展点",icon:"SignUp_Icon_Showpoint@2x.png",placeContent:"",default:this.exhibitionModel.node,canEdit:false,property:"node"}
            , {type:BespeakType.Time,requird:true,name:"预约时间",icon:"SignUp_Icon_Time@2x.png",placeContent:"",default:"2017/11/17 10:30",canEdit:true,property:"time"}
            , {type:BespeakType.Code,requird:true,name:"验证码",icon:"SignUp_Icon_Identify@2x.png",placeContent:"验证码(必填)",default:"",canEdit:true,property:"code"}
        ].map((one)=>{return new NodeBespeakItem(one)})
    }
    _renderItems = ()=>{
        return this.items.map((one,index)=>{
            return (
                <SubmitItemView model={this.exhibitionModel}
                                item={ one }
                                style = { NodeBespeakStyle.BespeakItem }
                                key = { one.name }
                                index = {index}
                >
                </SubmitItemView>
            )
        })
    };
    render(){
        return (
            <BaseContentView title={ "预约" }
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >
                {
                    this._renderItems()
                }
            </BaseContentView>
        )
    }
}