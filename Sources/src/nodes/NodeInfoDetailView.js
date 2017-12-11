/**
 * Created by zhuzihao on 2017/11/30.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image ,TouchableOpacity,Text,ScrollView,WebView} from 'react-native';
import { buttonColor} from "../Tools/commandColors"
import HTMLView from 'react-native-htmlview';
import BaseContentView,{deviateView} from "../Base/BaseContentView"

const NodeInfoStyle = StyleSheet.create({
    Bespeak:{
        position:"absolute",
        top:20,
        zIndex:10,
        backgroundColor:buttonColor,
        borderRadius:30,
        right:20,
        overflow:"hidden"
    },
    Button:{
        height:44,
        lineHeight:44,
        width:100,
        textAlign:"center",
        color:"white"
    }
});
const styleSheet = StyleSheet.create({});
export default class NodeInfoDetailView extends Component{
    constructor(ops){
        super(ops);
        this.state ={node:null}
    }
    componentDidMount(){
        this.setState({
            node:this.props.navigation.state.params.node
        })
    }
    _nodeBespeak = ()=>{
        this.props.navigation.navigate("nodeBespeak",{node:this.state.node})
    };
    render(){
        return (
            <BaseContentView title={ "详情" }
                             dismiss={ ()=>{
                                 this.props.navigation.goBack();
                             } }
                             backType={1}
            >
                <WebView style = { {flex:1} }
                         automaticallyAdjustContentInsets={ false }
                         mediaPlaybackRequiresUserAction={ true }
                         scalesPageToFit = { true }
                         source={ {
                             html:this.state.node == null ? "" : this.state.node.introduction,
                         } }
                >
                </WebView>
                <View style={ NodeInfoStyle.Bespeak }
                      key = { deviateView("Beskope")}
                >
                    <Text style = { NodeInfoStyle.Button }
                          onPress={ this._nodeBespeak }
                    >
                        预约
                    </Text>
                </View>
            </BaseContentView>
        )
    }
}

/***
 * <ScrollView>
 <HTMLView value = { this.node.introduction }
 stylesheet = { styleSheet }
 >

 </HTMLView>
 </ScrollView>
 *
 * */