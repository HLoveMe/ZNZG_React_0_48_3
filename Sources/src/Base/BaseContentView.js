/**
 * Created by zhuzihao on 2017/11/27.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View ,Text,Image,TouchableHighlight} from 'react-native';
import PXHandle from "../Tools/PXHandle"
const BaseStyle = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"white",
        borderRadius:10,
        overflow:"hidden",
        margin:10,
        marginTop:PXHandle.PXHeight(78),
    },
    BackIconC:{
        position:"absolute",
        left:10,
        bottom:10,
        width:40,
        height:40,
        backgroundColor:"white"
    },
    BackIcon:{
        width:"100%",
        height:"100%"
    },
    BaseContent:{
        flex:1,
        marginBottom:60,
        overflow:"scroll",
    },
    Title:{
        height:80,
        lineHeight:80,
        fontSize:40,
        paddingLeft:20,

    }

});
/**
 *  默认情况下  BaseContentView 子控件都会约束在 id="Deviate"的组件中
 *  如果  BaseContentView 的子组件key 值 key = deviateView("...") 就会脱离 id="Deviate"的组件
 *        而存在 id="Root" 的组件中的起始位置
 *
 *  position:"absolute",
 *  zIndex=11
 *
 * */
export const deviateView = (key)=>{
  return "_Deviate_" + `${key}`
};

export default class BaseContentView extends Component{

    render() {
        return (
            <View style={ [BaseStyle.Container,this.props.baseStyle] } id="Root">
                {
                    React.Children.map(this.props.children,(child)=>{
                        if(child.key == null){return null;}
                        if(child.key.indexOf("Deviate_") >= 0){
                            return child;
                        }else{
                            return null;
                        }
                    })
                }
                <Text style={ BaseStyle.Title }>
                    {this.props.title}
                </Text>
                <View style={ BaseStyle.BaseContent } id="Deviate">
                    {
                        React.Children.map(this.props.children,(child)=>{
                            if(child.key == null){return child;}
                            if(child.key.indexOf("Deviate_") < 0){
                                return child;
                            }else{
                                return null;
                            }
                        })
                    }
                </View>
                <TouchableHighlight style={ [BaseStyle.BackIconC,this.props.backStyle] }
                                    underlayColor={"white"}
                                    onPress= {()=>{this.props.dismiss && this.props.dismiss()}}
                >
                    <Image style={ BaseStyle.BackIcon }
                           source={ this.props.backType == 0 ? require("../../../images/Right_Buttom_Icon_Del_Nomal.png") : require("../../../images/Right_Buttom_Icon_Back_Nomal.png") }
                           resizeMode={"center"}
                    >
                    </Image>
                </TouchableHighlight>

            </View>
        )
    }
}
BaseContentView.defaultProps={
    backType:0
};
BaseContentView.propTypes = {
    title:PropTypes.string.isRequired,
    dismiss:PropTypes.func.isRequired,
    backType:PropTypes.number, // 0 消息  1 回退
    baseStyle:PropTypes.object,  //设置 内容Style
    backStyle:PropTypes.object,  //设置 back按钮style
};
