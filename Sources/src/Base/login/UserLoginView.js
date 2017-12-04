/**
 * Created by zhuzihao on 2017/12/1.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image ,Text,Button} from 'react-native';
import { BaseContentView } from "../BaseContentView";
import { UserManager } from "../User/UserManager";
import { NavigationActions } from 'react-navigation'
const LoginStyle = StyleSheet.create({
    container:{
        flex:1,
        margin:30,
        backgroundColor:"red"
    },
    backButton:{
        backgroundColor:"yellow"
    }
});
export class UserLoginView extends Component{
    target = null;
    constructor(ops){
        super(ops);
        console.log(ops);
    }
    render(){
        return (
            <View style = { LoginStyle.container }
            >
                <Text>{"AAA - "+this.target + " - "}</Text>
                <Button title={"返回"}
                        onPress={ ()=>{
                            console.log(UserLoginView.target);
                            this.props.navigation.goBack()
                        } }
                        style = { LoginStyle.backButton }
                >
                </Button>
                <Button title={"登入"}
                        onPress={ ()=>{
                            UserManager.userLogin().subscribe((flag)=>{
                               if(flag){
                                   let params = this.props.navigation.state.params;
                                   let target = params["login_target"];
                                   let router = params["router"];
                                   delete params["login_target"];
                                   delete params["router"];
                                   let {index,routes} = router;
                                   routes[index].params = params;
                                   routes[index].routeName = target;
                                   let actions = routes.map((one)=>{
                                      return NavigationActions.navigate(one);
                                   });
                                   this.props.navigation.dispatch(NavigationActions.reset({
                                       index:index,
                                       actions:actions
                                   }));
                               }else{
                                   alert("失败");
                               }
                            });
                        }}
                        style = { LoginStyle.backButton }
                >
                </Button>
            </View>
        )
    }
}

export const LoginConfig = {
    ZGZGLogin_:{
        screen:UserLoginView
    }
};
export const ProfileName = "ZGZGLogin_";