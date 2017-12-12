/**
 * Created by zhuzihao on 2017/12/12.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View ,Text,Image,SectionList,TouchableHighlight } from 'react-native';

const SettingCellStyle = StyleSheet.create({
    cellStyle:{
        height:44,
        borderWidth:1,
        borderColor:"red",
        justifyContent:"flex-start",
        flexDirection:"row",
    },
    lineStyle:{
        position:"absolute",
        height:1,
        bottom:0,
        right:0,
        left:44,
        backgroundColor:"#999999"
    },
    iconStyleC:{
        backgroundColor:"red",
        width:44,
    },
    titleStyleC:{
        flex:1,
        justifyContent:"center"
    },
    titleStyle:{
    },
    accessoryStyle:{
        width:60,
        backgroundColor:"yellow"
    }
});

export default class SettingCellView extends Component{
    constructor(ops){
        super(ops)
    }
    _renderLine = ()=>{
        return this.props.line ? (<View style = {[SettingCellStyle.lineStyle,this.props.lineStyle]}></View>) : null;
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
    render(){
        return (
            <View style={
                [SettingCellStyle.cellStyle,this.props.cellStyle]
            }
            >
                <View style = {[SettingCellStyle.iconStyleC]}>
                    <Image source={require("../../../../images/my_about.png")}
                           style={{}}
                    >
                    </Image>
                </View>
                <View style = {[SettingCellStyle.titleStyleC]}>
                    <Text style = {[SettingCellStyle.titleStyle,this.props.titleStyle]}>
                        AAa
                    </Text>
                </View>
                {
                    this._accessoryView()
                }
                {
                    this._renderLine()
                }
            </View>
        )
    }
}
SettingCellView.defaultProps = {
    line:true,
    accessory:true
};
SettingCellView.propTypes = {
    line:PropTypes.bool,  //是否出现线条
    lineStyle:PropTypes.object,//线条样式

    cellStyle:PropTypes.object, //cell的样式

    titleStyle:PropTypes.object, //文本

    accessory:PropTypes.bool,  //是否有辅助视图
    accessoryStyle:PropTypes.object, //视图容器样式
    accessoryView:PropTypes.object, //辅助视图
};