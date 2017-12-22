/**
 * Created by zhuzihao on 2017/12/12.
 */
import React, { Component } from 'react';
import { StyleSheet, View ,ScrollView} from 'react-native';
import BaseContentView from "../../Base/BaseContentView"
import {NetWorkManager,URLString} from "../../Base/netWork/NetWorkManager"
import HTMLView from 'react-native-htmlview';

class AppAbout{
    organizer;
    hall_name;
    hall_location;
    hall_album;
    hall_introduce;
    about;

    constructor(about) {
        this.organizer = about["organizer"];
        this.hall_name = about["hall_name"];
        this.hall_location = about["hall_location"];
        this.hall_album = about["hall_album"];
        this.hall_introduce = about["hall_introduce"];
        this.about = about["about"];
    }
}

export  default class SettingAboutView extends Component{
    appAbout = null;
    constructor(ops){
        super(ops);
        NetWorkManager.GET(URLString("hall/info")).subscribe((res)=>{
            this.appAbout = new AppAbout(res);
        });
    }
    render(){
        return (
            <BaseContentView title={"关于"}
                             dismiss={ this.props.navigation.goBack }
                             backType={1}
            >
                <ScrollView style = {{flex:1}}>
                    <HTMLView value = { this.appAbout != null ? this.appAbout.about : ""}

                    ></HTMLView>
                </ScrollView>
            </BaseContentView>
        )
    }
}