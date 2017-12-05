/**
 * Created by zhuzihao on 2017/12/1.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image ,Text,TouchableHighlight,TouchableOpacity,Keyboard} from 'react-native';
import Button from 'apsl-react-native-button'
import { UserManager } from "../User/UserManager";
import { NavigationActions } from 'react-navigation'
import TextInputView from "../../Tools/Views/TextInputView"
import PXHandle from  "../../Tools/PXHandle"
import {buttonColor,fontColor,lineColor} from  "../../Tools/commandColors"
import { NetWorkManager,URLString } from "../netWork/NetWorkManager"
import Toast from 'react-native-root-toast';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
const LoginStyle = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        margin: 10,
        marginTop: PXHandle.PXHeight(78),
    },
    BackIconC: {
        position: "absolute",
        left: 10,
        bottom: 10,
        width: 40,
        height: 40,
        backgroundColor: "white"
    },
    BackIcon: {
        width: "100%",
        height: "100%"
    },
    BaseContent: {
        flex: 1,
        marginBottom: 60,
        overflow: "scroll",
    },
    Title: {
        height: 80,
        lineHeight: 80,
        fontSize: 40,
        paddingLeft: 20,

    },
    loginButton:{
        height:44,
        borderRadius:22,
        backgroundColor:buttonColor,
        borderWidth:0,
        marginTop:PXHandle.PXHeight(334),
        width:PXHandle.PXWidth(650),
        marginLeft:PXHandle.PXWidth(30),
    },
    Line:{
        height:44,
        marginTop:15,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:20
    },
    lineLine:{
        height:0.5,
        backgroundColor:fontColor,
        width:"100%"
    },
    lineText:{
        position:"absolute",
        fontSize:14,
        color:fontColor,
    },
    thirdLogin:{
        height:44,
        marginTop:PXHandle.PXHeight(30),
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
    },
    thirdOne:{
        width:80,
        height:44,
        paddingHorizontal:18
    },
    thirdImage:{
        width:"100%",
        height:"100%"
    }
});
export class UserLoginView extends Component{
    target = null;
    JPush="121c83f76021331008c";
    constructor(ops){
        super(ops);
        this.state = {
            phone:"17688938286",
            code:""
        }
    }
    thirdLogin = (type)=>{
      if(type == 1){
          alert("QQ登入")
      }else{
        alert("微信登入")
      }
    };
    _getCode = ()=>{
        NetWorkManager.POST(URLString("sys/send-login-smscode"),{"mobile":this.state.phone}).subscribe((res)=>{
            if(res.success && res.error == null){
                Toast.show("\n  发送成功 \n",{
                    duration:Toast.durations.SHORT,
                    position:Toast.positions.CENTER,
                    shadow:false,
                    animation:true,
                    hideOnPress:true,
                    delay:0,
                })
            }
        });
    };
    _login = ()=>{
        this.refs.Loading.show();
        NetWorkManager.POST(URLString("sys/mobile-login"),{"mobile":this.state.phone,"smscode":this.state.code,"registration_id":this.JPush}).subscribe((res)=>{
            this.refs.Loading.hide();
            if(res.success && res.error == null){
                UserManager.userLogin(res.result);
                let params = this.props.navigation.state.params;
                let target = params["login_target"];
                let router = params["router"];
                delete params["login_target"];
                delete params["router"];
                let {index,routes} = router;
                routes[index].params = params;
                routes[index].routeName = target;
                let actions = routes.map((one)=>{
                    return NavigationActions.navigate(one);
                });
                this.props.navigation.dispatch(NavigationActions.reset({
                    index:index,
                    actions:actions
                }));
            }
        },()=>{this.refs.Loading.hide()})
    };
    render(){
        return (
            <TouchableOpacity style={ [LoginStyle.Container,this.props.baseStyle] }
                              activeOpacity = {1}
                              onPress = {Keyboard.dismiss}
            >
                <Text style={ LoginStyle.Title }>登入</Text>
                <View style={ LoginStyle.BaseContent }>
                    <TextInputView placeholder= "输入手机号"
                                   style = {{marginTop:10}}
                                   textChange={ (phone)=>{this.setState({phone})}}
                                   value={ this.state.phone }
                    >
                    </TextInputView>
                    <TextInputView placeholder= "输入验证码"
                                   type={1}
                                   style = {{marginTop:20}}
                                   textChange={ (code)=>{this.setState({code})}}
                                   value={ this.state.code }
                                   codePress={ this._getCode }
                    >

                    </TextInputView>
                    <Button style= {LoginStyle.loginButton}
                            textStyle={{color:"white"}}
                            onPress={this._login}
                    >
                        登入
                    </Button>
                    <View style= {LoginStyle.Line}>
                        <View style={ LoginStyle.lineLine }></View>
                        <Text style={ LoginStyle.lineText }>{
                            "  第三方登入  "
                        }</Text>
                    </View>
                    <View style = { LoginStyle.thirdLogin }>
                        <View style = { LoginStyle.thirdOne }>
                            <TouchableHighlight onPress = { ()=>this.thirdLogin(1) }
                                                underlayColor="white"

                            >
                                <Image style = { LoginStyle.thirdImage }
                                       source={require("../../../../images/Loading_Button_QQ_Normal.png")}
                                ></Image>
                            </TouchableHighlight>
                        </View>
                        <View style = { LoginStyle.thirdOne }>
                            <TouchableHighlight onPress = { ()=>this.thirdLogin(2) }
                                                underlayColor="white"
                            >
                                <Image style = { LoginStyle.thirdImage }
                                       source={require("../../../../images/Icon_Wechat_Nomal.png")}
                                ></Image>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <TouchableHighlight style={ [LoginStyle.BackIconC,this.props.backStyle] }
                                    underlayColor={"white"}
                                    onPress= {()=>{
                                        this.props.navigation.goBack(this.props.navigation.state.params.key)
                                    }}
                >
                    <Image style={ LoginStyle.BackIcon }
                           source={ this.props.backType == 0 ? require("../../../../images/Right_Buttom_Icon_Del_Nomal.png") : require("../../../../images/Right_Buttom_Icon_Back_Nomal.png") }
                           resizeMode={"center"}
                    >
                    </Image>
                </TouchableHighlight>
                <LoadingSpinnerOverlay ref="Loading"
                                       modal={true}
                                       dismissWhenPress={true}
                >

                </LoadingSpinnerOverlay>
            </TouchableOpacity>
        )
    }
}

export const LoginConfig = {
    ZGZGLogin_:{
        screen:UserLoginView
    }
};
export const ProfileName = "ZGZGLogin_";


/**
 * UserManager.userLogin().subscribe((flag)=>{
                               if(flag){
                                   let params = this.props.navigation.state.params;
                                   let target = params["login_target"];
                                   let router = params["router"];
                                   delete params["login_target"];
                                   delete params["router"];
                                   let {index,routes} = router;
                                   routes[index].params = params;
                                   routes[index].routeName = target;
                                   let actions = routes.map((one)=>{
                                      return NavigationActions.navigate(one);
                                   });
                                   this.props.navigation.dispatch(NavigationActions.reset({
                                       index:index,
                                       actions:actions
                                   }));
                               }else{
                                   alert("失败");
                               }
                            });
 * 
 * 
 * 
 * */