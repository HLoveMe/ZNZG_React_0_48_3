/**
 * Created by zhuzihao on 2017/11/28.
 */


import React, { Component } from 'react';
import { StyleSheet, View,Image ,TouchableOpacity,Text ,ImageBackground,Animated} from 'react-native';
import PXhandle from "../Tools/PXHandle"
import { buttonColor} from "../Tools/commandColors"
import Button from 'apsl-react-native-button'

let height = PXhandle.PXHeight(560);
const  NodeInfoStyle = StyleSheet.create({
    bKContent:{
        flex:1,
    },
    Content:{
        flex:1,
        backgroundColor:"rgba(100,100,100,0.4)"
    },
    Info:{
        backgroundColor:"white",
        height:height,
        overflow:"hidden",
        width:PXhandle.ScreenWidth - 20,
        borderRadius:10,
        position:"absolute",
        bottom:10,
        left:10
    },
    title:{
        fontSize:30,
        paddingVertical:20,
        paddingHorizontal:10
    },
    summary:{
        padding:PXhandle.PXWidth(40),
        fontSize:14,
        paddingTop:0,
        lineHeight:16,
        height:52,
    },
    tools:{
        height:PXhandle.PXHeight(140),
        justifyContent:"flex-start",
        flexDirection:"row",
        paddingHorizontal:10
    },
    tool:{
        height:"100%",
        flex:1,
    },
    goButton:{
        backgroundColor:buttonColor,
        borderWidth:0,
        marginHorizontal:20,
        height:44,
        borderRadius:22,
        marginTop:25
    },
    detail:{
        position:"absolute",
        top:30,
        width:100,
        textAlign:"center",
        right:0,
        textDecorationLine:"underline",
        color:buttonColor
    }
});

export  default class NodeInfoView extends Component{
    constructor(ops){
        super(ops);
        this.state = {
            node:this.props.screenProps.currentNode,
            disabled:false,
        }
    }
    componentDidMount(){

    }
    goDetail = ()=>{
        this.props.navigation.navigate("nodeInfoDetail",{node:this.state.node});
        //测试NavigationActions
        return;
        /**
         *  得到同样的效果  并且直接到预约界面
         *
           this.props.navigation.dispatch(NavigationActions.reset({
            actions: [
                NavigationActions.navigate({ routeName: 'nodeInfo'}),
                NavigationActions.navigate({ routeName: 'nodeInfoDetail',params:{node:this.state.node},}),
                NavigationActions.navigate({ routeName: 'nodeBespeak',params:{node:this.state.node},}),
            ],
            index:2
            }))
         *
         * */
    };
    _dimiss = (index)=>{
        this.props.screenProps.dismiss(index);
    };
    render(){
        return (
            <ImageBackground style = { NodeInfoStyle.bKContent } source={{uri:this.props.screenProps.bkurl}}>
                <TouchableOpacity style={ NodeInfoStyle.Content }
                                  disabled = {this.state.disabled}
                                  onPress={()=>{
                                      this.setState({
                                          disabled:true
                                      },this._dimiss)

                                  }}
                                  activeOpacity={1}
                >
                </TouchableOpacity>
                <Animated.View style = { [NodeInfoStyle.Info] }>
                    <Text style={NodeInfoStyle.title}>{this.state.node.title}</Text>
                    <Text style={NodeInfoStyle.summary}
                          numberOfLines = {3}
                    >
                        {
                            this.state.node.summary
                        }
                    </Text>
                    <View style= { NodeInfoStyle.tools }>
                        <NodeInfoPart style= { NodeInfoStyle.tool }
                                      index = { 0 }
                                      text = {"留言"}
                                      onPress = { ()=>{alert(1)} }
                        ></NodeInfoPart>
                        <NodeInfoPart style= { NodeInfoStyle.tool }
                                      index = { 1 }
                                      text = {"语音"}
                                      onPress = { ()=>{
                                          this.setState({
                                              disabled:true
                                          },()=>{
                                              this._dimiss(1);
                                          })
                                      } }
                        ></NodeInfoPart>
                        <NodeInfoPart style= { NodeInfoStyle.tool }
                                      index = { 2 }
                                      text = {"下载"}
                                      onPress = { ()=>{alert(3)} }
                        ></NodeInfoPart>
                    </View>
                    <Button style = { NodeInfoStyle.goButton }
                            children={"去该展点"}
                            textStyle =  {{
                                    color:"white"
                                }}
                            onPressIn = {
                                ()=>{
                                    alert(11);
                                }
                            }
                    >
                    </Button>
                    <Text style = {NodeInfoStyle.detail} onPress={ this.goDetail }>进入详情</Text>
                </Animated.View>
            </ImageBackground>
        )
    }
}
const NodeInfoPartStyle = StyleSheet.create({
   image:{
       flex:3,
       width:"100%"
   },
    text:{
        flex:1,
        textAlign:"center",
        fontSize:16
    }
});
class NodeInfoPart extends  Component{
    constructor(ops){
        super(ops);
    }
    render(){
        let  source = null;
        if(this.props.index == 0){
            source = require("../../../images/Select_Icon_message.png")
        }else if(this.props.index == 1){
            source = require("../../../images/Select_Icon_Voice.png")
        }else{
            source = require("../../../images/Select_Icon_download.png")
        }
        return (
            <TouchableOpacity {...this.props}>
                <Image style={NodeInfoPartStyle.image}
                        source={source}
                       resizeMode={"center"}
                >

                </Image>
                <Text style={NodeInfoPartStyle.text}>
                    {
                        this.props.text
                    }
                </Text>
            </TouchableOpacity>
        )
    }
}