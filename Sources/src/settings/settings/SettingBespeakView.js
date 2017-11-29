/**
 * Created by zhuzihao on 2017/11/27.
 */

import React, { Component } from 'react';
import { StyleSheet, View ,Text } from 'react-native';
import BaseContentView from "../../Base/BaseContentView"
export default class SettingBespeakView extends Component{
    constructor(ops){
        super(ops);
    }
    render(){
        return (
            <BaseContentView title={"预约"}
                             backType={1}
                             dismiss={()=>this.props.navigation.goBack()}
            >

            </BaseContentView>
        )
    }
}