/**
 * Created by zhuzihao on 2018/1/8.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image,Text} from 'react-native';
import BaseContentView from "../Base/BaseContentView"
import QRCode from "react-native-qrcode"
const NodeBespeakResultViewStyle = StyleSheet.create({
    qCode:{
        height:200,
        alignItems:"center"
    },
    topText:{
        textAlign:"center",
        fontSize:20,
        marginBottom:20
    },
    bottomText:{
        textAlign:"center",
        fontSize:20,
        marginTop:20
    }
});
export default class NodeBespeakResultView extends  Component{
    constructor(ops){
        super(ops);
        this.state = {
            message:"{\"type\":0,\"id\":\"4\"}"//this.props.navigation.state.params.info
        }
    }
    render(){
        return (
            <BaseContentView title={ "预约状态" }
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >
                <Text style={NodeBespeakResultViewStyle.topText}>预约成功</Text>
                <View style = {NodeBespeakResultViewStyle.qCode}>
                    <QRCode value = {this.state.message}
                            size={200}
                            bgColor="white"
                            fgColor="black"

                    ></QRCode>
                </View>
                <Text style={NodeBespeakResultViewStyle.bottomText}>
                    场景订阅成功 欢迎见您
                </Text>
            </BaseContentView>
        )
    }

}