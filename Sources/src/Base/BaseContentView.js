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
    },
    Title:{
        height:80,
        lineHeight:80,
        fontSize:40,
        paddingLeft:20,

    }

});

export default class BaseContentView extends Component{
    componentDidMount(){
        console.log(this.props.navigate)
    }
    render() {

        return (
            <View style={ [BaseStyle.Container,this.props.baseStyle] }>
                <Text style={ BaseStyle.Title }>
                    {this.props.title}
                </Text>
                <View style={ BaseStyle.BaseContent }>
                    {this.props.children}
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
