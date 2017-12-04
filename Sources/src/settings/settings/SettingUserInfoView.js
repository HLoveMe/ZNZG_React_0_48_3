/**
 * Created by zhuzihao on 2017/12/1.
 */

import React, { Component } from 'react';
import { StyleSheet, View ,Text,Image,SectionList,TouchableHighlight } from 'react-native';
import BaseContentView from "../../Base/BaseContentView"
export default class SettingUserInfoView extends  Component{
    static power = true;
    constructor(ops){
        super(ops)
    }
    render(){
        return (
            <BaseContentView title={"信息"}
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >

            </BaseContentView>
        )
    }
}