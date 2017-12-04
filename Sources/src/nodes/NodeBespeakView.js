/**
 * Created by zhuzihao on 2017/11/30.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image,Text} from 'react-native';


import BaseContentView from "../Base/BaseContentView"
export  default class NodeBespeakView extends Component{
    static  power = true;
    constructor(ops){
        super(ops);
        this.node  = this.props.navigation.state.params.node;

    }
    render(){
        return (
            <BaseContentView title={ "预约" }
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >
                <Text>AAA</Text>
            </BaseContentView>
        )
    }
}