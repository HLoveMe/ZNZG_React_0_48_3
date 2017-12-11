/**
 * Created by zhuzihao on 2017/12/5.
 */

//提交item
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,Image ,TouchableOpacity,Text,TextInput} from 'react-native';

const SubmitItemStyle = StyleSheet.create({
    item:{
        flexDirection:"row",
    },
    part:{
        flex:1,
        borderWidth:1,
        borderColor:"yellow"
    },
    icon:{
        width:54,
        backgroundColor:"yellow"
    },
    title:{
        width:80,
        backgroundColor:"blue",
        justifyContent:"center",
        alignContent:"center"
    }

});
export  class  SubmitItemView extends  Component{
    constructor(ops){
        super(ops)
    }
    _getIconURL =()=>{
        /**
         SignUp_Icon_User.png
         SignUp_Icon_Company@2x.png
         SignUp_Icon_Job@2x.png
         SignUp_Icon_Cellphone@2x.png
         SignUp_Icon_Showpoint@2x.png
         SignUp_Icon_Time@2x.png
         SignUp_Icon_Identify@2x.png
         * */
        switch (this.props.index){
            case 0:
                return require("../../../../images/SignUp_Icon_User.png");
            case 1:
                return require("../../../../images/SignUp_Icon_Company.png");
            case 2:
                return require("../../../../images/SignUp_Icon_User.png");
            case 3:
                return require("../../../../images/SignUp_Icon_User.png");
            case 4:
                return require("../../../../images/SignUp_Icon_User.png");
            case 5:
                return require("../../../../images/SignUp_Icon_User.png");
            case 6:
                break
        }
    };
    render(){
        return(
            <View style = { [this.props.style,SubmitItemStyle.item] }>
                <View style = { [SubmitItemStyle.icon ]} >
                </View>
                <View style = { [SubmitItemStyle.title ]}>
                    <Text style={{textAlign:"center",fontSize:18}}>{this.props.item.name}</Text>
                </View>
                <View style = { [SubmitItemStyle.part ]} ></View>
            </View>
        )
    }
}

SubmitItemView.propTypes = {
    item:PropTypes.object,
    model:PropTypes.object,
    index:PropTypes.number
};