/**
 * Created by zhuzihao on 2017/11/30.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image,Text,Keyboard,Animated} from 'react-native';
import {BespeakType,NodeBespeakItem,NodeBespeakUpdateModel} from "./BespeakModels"
import { SubmitItemView } from "../Tools/Views/SubmitItemView"
import BaseContentView from "../Base/BaseContentView"
import PXHandle from "../Tools/PXHandle"
import {lineColor,buttonColor} from "../Tools/commandColors"
import Button from 'apsl-react-native-button'
import { NetWorkManager } from "../Base/netWork/NetWorkManager"
const SureHeight = PXHandle.PXHeight(88)
const NodeBespeakStyle = StyleSheet.create({
   BespeakItem:{
       height:PXHandle.PXHeight(108),
       borderBottomWidth:1,
       borderBottomColor:lineColor
   },
    SureButton:{
        marginTop:PXHandle.PXHeight(80),
        marginHorizontal:20,
        height:SureHeight,
        borderRadius:SureHeight / 2,
        backgroundColor:buttonColor,
        borderWidth:0,

    }
});
export  default class NodeBespeakView extends Component{
    //static  power = true;
    constructor(ops){
        super(ops);
        console.log(ops)
        this.node  = this.props.navigation.state.params.node;
        this.exhibitionModel = new  NodeBespeakUpdateModel({ //提交的Model
            phone:"17688938286",
            node:this.node.title
        });

        this.items = [{type:BespeakType.Content,requird:true,name:"姓名",icon:"SignUp_Icon_User@2x.png",placeContent:"请输入预约姓名(必填)",default:"",canEdit:true,property:"name"}
            , {type:BespeakType.Content,requird:false,name:"公司",icon:"SignUp_Icon_Company@2x.png",placeContent:"请输入预约人所在公司(选填)",default:"",canEdit:true,property:"company"}
            , {type:BespeakType.Content,requird:false,name:"职位",icon:"SignUp_Icon_Job@2x.png",placeContent:"请输入职位(选填)",default:"",canEdit:true,property:"position"}
            , {type:BespeakType.Number,requird:true,name:"电话",icon:"SignUp_Icon_Cellphone@2x.png",placeContent:"请输入预约人电话(必填)",default:this.exhibitionModel.phone,canEdit:true,property:"phone"}
            , {type:BespeakType.Content,requird:true,name:"预约展点",icon:"SignUp_Icon_Showpoint@2x.png",placeContent:"",default:this.exhibitionModel.node,canEdit:false,property:"node"}
            , {type:BespeakType.Time,requird:true,name:"预约时间",icon:"SignUp_Icon_Time@2x.png",placeContent:"",default:new Date().Format("yyyy-MM-dd hh:mm"),canEdit:true,property:"time"}
            , {type:BespeakType.Code,requird:true,name:"验证码",icon:"SignUp_Icon_Identify@2x.png",placeContent:"验证码(必填)",default:"",canEdit:true,property:"code"}
        ].map((one)=>{return new NodeBespeakItem(one)});

        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
        this.itemViews = {};
        this.state = {
            positionTop:new Animated.Value(0),
            aimation:false //是否已经进行移动
        }
    }
    _keyboardDidShow  = (e) => {
        console.log(e);
        let screenY = e.endCoordinates.screenY;
        let textInput;
        for(var index in this.itemViews){
            let one = this.itemViews[index].textInput;
            if(one  && one.isFocused()){
                textInput = one;
                break
            }
        }
        textInput.measureInWindow((x,y,w,h)=>{
            // 144 119 221 53
            if(y+h > screenY){
                Animated.timing(this.state.positionTop,{
                    toValue:(screenY - (x+y)),
                    duration:250,
                }).start();
                this.setState({aimation:true})
            }else{
                if(this.state.aimation){
                    this._keyboardDidHide();
                }
            }
        })
    };

    _keyboardDidHide  = () => {
        this.setState({aimation:false});
        Animated.timing(this.state.positionTop,{
            toValue:0,
            duration:250,
        }).start();
    };
    _renderItems = ()=>{
        return this.items.map((one,index)=>{
            return (
                <SubmitItemView ref={ item=>{
                    this.itemViews[one.property] = item
                } } model={this.exhibitionModel}
                                item={ one }
                                style = { NodeBespeakStyle.BespeakItem }
                                key = { one.name }
                                index = {index}
                >
                </SubmitItemView>
            )
        })
    };
    componentDidMount(){

    }
    componentWillUnmount(){
        Keyboard.dismiss();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _info_submit = ()=>{
        //数据验证
        // for(var index in this.items){
        //     var one = this.items[index];
        //     if(one.requird){
        //         var property = this.exhibitionModel[one.property];
        //         if(property == null || property.length == 0){
        //             return
        //         }
        //     }
        // }
        //数据提交
        // var info = {};
        // for(var index in this.items){
        //     var one = this.items[index];
        //     var name = one.property;
        //     var value = this.node.id;
        //     info[name] = value;
        // }
        // info["pre_time"] = this.exhibitionModel["time"];
        // info["exhibition_id"] = this.exhibitionModel["time"];
        // info["smscode"] = this.exhibitionModel["code"];
        // NetWorkManager.POST("http://ah.vr68.com/apiv1/exhibition/preorder",info).subscribe((info)=>{
        //     if(info.error == null && info.success){
        //         console.log("成功")
        //         var data = info.res_body.qrcode_data;
        //         this.props.navigation.navigate("nodeBespeakState",{info:data})
        //     }
        // });
        this.props.navigation.navigate("nodeBespeakState",{info:this.node.title})
    };
    render(){
        return (
            <BaseContentView title={ "预约" }
                              dismiss={ this.props.navigation.goBack }
                              backType={1}
            >
                <Animated.View ref="submitView" style={{marginTop:this.state.positionTop}}>
                    {
                        this._renderItems()
                    }
                    {
                        <Button style = {NodeBespeakStyle.SureButton}
                                textStyle = {{color:"white"}}
                                onPress={()=>{
                                    console.log(this.exhibitionModel);
                                    this._info_submit();
                                }}
                        >
                            确定
                        </Button>
                    }
                </Animated.View>
            </BaseContentView>
        )
    }
}