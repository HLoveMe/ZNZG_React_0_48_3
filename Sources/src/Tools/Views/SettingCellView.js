/**
 * Created by zhuzihao on 2017/12/12.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View ,Text,Image,TouchableHighlight } from 'react-native';

const accessoryWidth = 60;//默认辅助视图宽
const iconWidth = 44;//默认图标宽度
const noIconPadding = 20;//在没有图标时的 文本左padding-left
const SettingCellStyle = StyleSheet.create({
    TouchableStyle:{
        height:44,
    },
    cellStyle:{
        justifyContent:"flex-start",
        flexDirection:"row",
        height:"100%",
    },
    lineStyle:{
        position:"absolute",
        height:1,
        bottom:0,
        right:0,
        left:iconWidth,
        backgroundColor:"#f1f1f1"
    },
    iconStyleC:{
        width:iconWidth,
        justifyContent:"center",
        alignItems:"center",
    },
    titleStyleC:{
        flex:1,
        overflow:"hidden",
        justifyContent:"center",
    },
    titleStyle:{
        fontSize:14,
        padding:5
    },
    accessoryStyle:{
        width:accessoryWidth,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white"
    }
});

export default class SettingCellView extends Component{
    constructor(ops){
        super(ops);
    }
    _renderIcon = ()=>{
        return this.props.icon == null ? (null) : (<View style = {[SettingCellStyle.iconStyleC]}>
            <Image source={this.props.icon}
            >
            </Image>
        </View>)
    };
    _renderLine = ()=>{
        let right = 0;
        if(this.props.accessory){
            if(this.props.accessoryStyle && this.props.accessoryStyle.width){
                right = Math.max(accessoryWidth,this.props.accessoryStyle.width);
            }else {
                right = accessoryWidth;
            }
        }
        let left = this.props.icon != null ? iconWidth : noIconPadding;
        return this.props.line ? (<View style = {[SettingCellStyle.lineStyle,{left:left,right:right},this.props.lineStyle]}></View>) : null;
    };
    _accessoryView = ()=>{
        return this.props.accessory ? (
            <View style = { [SettingCellStyle.accessoryStyle,this.props.accessoryStyle] }>
                {
                    this.props.accessoryView
                }
            </View>
        ) :null;
    };
    _renderTitle = ()=>{
        let paddingLeft = this.props.icon != null ? 5 : noIconPadding;
        return (
            <View style = {[SettingCellStyle.titleStyleC]}>
                <Text style = {[SettingCellStyle.titleStyle,this.props.titleStyle,{paddingLeft:paddingLeft}]}>
                    {
                        this.props.title
                    }
                </Text>
            </View>
        )
    };
    render(){

        return (
        <TouchableHighlight style={[SettingCellStyle.TouchableStyle,this.props.cellStyle]}
                            onPress = {()=>{
                                this.props.itemClick && this.props.itemClick();
                            }}
                            activeOpacity = {0.5}
                            underlayColor = {"#f5f5f5"}
        >
            <View  style = {[SettingCellStyle.cellStyle]}
            >
                {
                    this._renderIcon()
                }
                {
                    this._renderTitle()
                }
                {
                    this._accessoryView()
                }
                {
                    this._renderLine()
                }
            </View>
        </TouchableHighlight>
        )
    }
}
SettingCellView.defaultProps = {
    line:true,
    accessory:false,
    icon:null
};
SettingCellView.propTypes = {
    icon:PropTypes.number, //图标
    title:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]), //文本
    line:PropTypes.bool,  //是否出现线条
    lineStyle:PropTypes.object,//线条样式

    cellStyle:PropTypes.object, //cell的样式

    titleStyle:PropTypes.object, //文本

    accessory:PropTypes.bool,  //是否有辅助视图
    accessoryStyle:PropTypes.object, //视图容器样式
    accessoryView:PropTypes.object, //辅助视图

    itemClick:PropTypes.func, //点击事件
};