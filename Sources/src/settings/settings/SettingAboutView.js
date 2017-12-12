/**
 * Created by zhuzihao on 2017/12/12.
 */
import React, { Component } from 'react';
import { StyleSheet, View ,Text,Image,SectionList,TouchableHighlight } from 'react-native';
import BaseContentView from "../../Base/BaseContentView"



export  default class SettingAboutView extends Component{
    constructor(ops){
        super(ops)
    }
    render(){
        return (
            <BaseContentView title={"关于"}
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >

            </BaseContentView>
        )
    }
}