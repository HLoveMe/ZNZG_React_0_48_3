/**
 * Created by zhuzihao on 2017/11/27.
 */

import React, { Component } from 'react';
import { StyleSheet, View ,Text } from 'react-native';
import BaseContentView from "../../Base/BaseContentView"


export default class SettingMessageView extends Component{
    render(){
        return (
            <BaseContentView title={"消息"}
                             backType={1}
                             dismiss={()=>this.props.navigation.goBack()}
            >

            </BaseContentView>
        )
    }
}