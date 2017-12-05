/**
 * Created by zhuzihao on 2017/12/5.
 */


import React, { Component } from 'react';
import { StyleSheet, View,Image ,Text,TouchableHighlight,TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Button from 'apsl-react-native-button'
import { buttonColor,fontColor ,lineColor} from "../commandColors"
import {Observable} from "rxjs/Rx"

const  InputViewStyle = StyleSheet.create({
    textContainer:{
        borderBottomWidth:1,
        borderBottomColor:lineColor,
        marginHorizontal:20,
    },
    input:{

        height:48,
    },
    code:{
        position:"absolute",
        top:7,
        bottom:7,
        margin:"auto",
        right:0,
        width:100,
        marginRight:10
    },
    button:{
        height:"100%",
        borderWidth:0.5,
        borderColor:buttonColor,
        borderRadius:17
    }
});
export default class TextInputView extends Component{
    constructor(ops){
        super(ops);
        this.time = 9;
        this.state = {
            title:"获取验证码",
            isDisabled:false
        }
    }
    componentWillUnmount(){
        this.disp && this.disp.unsubscribe();
    }
    _renderCode = ()=>{
        if(this.props.type == 0){return null}
        return (
            <View style={InputViewStyle.code}  >
                <Button
                    onPress={()=>{
                        this.setState({
                            isDisabled:true,
                            title:`${this.time + 1}` + "s后重试"
                        });
                        this.disp = Observable.interval(1000).timeInterval().take(this.time + 2).subscribe(({value})=>{
                            console.log(value);
                            if(value == (this.time + 1)){
                                this.setState({
                                    title:"获取验证码",
                                    isDisabled:false
                                });
                            }else{
                                this.setState({
                                    title:`${this.time - value}` + "s后重试"
                                });
                            }
                        });
                        this.props.codePress && this.props.codePress();
                    }}
                    isDisabled={this.state.isDisabled}
                    style = { InputViewStyle.button }
                    textStyle = {[{ fontSize:14,color:this.state.isDisabled ? fontColor : buttonColor }]}
                    disabledStyle = {{borderColor:fontColor}}
                >
                    { this.state.title }
                </Button>
            </View>
        )
    };
    render(){
        return (
            <View style = { [InputViewStyle.textContainer,this.props.style] } >
                <TextInput style={ InputViewStyle.input }
                           placeholder = { this.props.placeholder }
                           value={ this.props.value }
                           secureTextEntry={ this.props.secureTextEntry }
                           onSubmitEditing={ this.props.submit }
                           onChangeText={ this.props.textChange }
                           keyboardType={ this.props.type == 0 ? "default" : "numeric" }
                           editable={ this.props.editable }
                           blurOnSubmit={true}
                >

                </TextInput>
                {
                    this._renderCode()
                }
            </View>
        )
    }
}
TextInputView.defaultProps = {
    type:0,
    editable:true,
    value:""
};
TextInputView.propTypes = {
    placeholder:PropTypes.string,
    secureTextEntry:PropTypes.bool,
    value:PropTypes.string,
    submit:PropTypes.func,
    type:PropTypes.number,
    textChange:PropTypes.func,
    editable:PropTypes.bool,
    codePress:PropTypes.func,
};