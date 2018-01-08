/**
 * Created by zhuzihao on 2017/12/5.
 */

//提交item
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,Image ,TouchableOpacity,Text,TextInput} from 'react-native';
import {Observable} from "rxjs/Rx"
import Button from 'apsl-react-native-button'
import { fontColor,buttonColor } from "../commandColors"
import DatePicker from "react-native-datepicker"
const SubmitItemStyle = StyleSheet.create({
    item:{
        flexDirection:"row",
    },
    part:{
        flex:1,
    },
    icon:{
        width:54,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        width:80,
        justifyContent:"center",
        alignContent:"center",
    },
    part_TextInput:{
        height:"100%",
        fontSize:16
    },
    part_timeInput:{
        height:"100%",
        borderWidth:1,
        borderRadius:0,
        borderColor:"white",
        width:"100%"
    },
    part_Code_Container:{
        height:"100%",
        flexDirection:"row",

    },
    part_Code_Content:{
        flex:1,
    },
    part_Code_Button:{
        height:"100%",
        justifyContent:"center",
    }
});
export  class  SubmitItemView extends  Component{
    constructor(ops){
        super(ops);
        this.isDisabled = true;
        this.time = 59;
        if(this.props.item.type == 3){
            this.state = {title:"获取验证码",content:""}
        }else
            this.state = {content:this.props.item.default}
    }
    _getIconURL =()=>{
        switch (this.props.index){
            case 0:
                return require("../../../../images/SignUp_Icon_User.png");
            case 1:
                return require("../../../../images/SignUp_Icon_Company.png");
                //这一天我妈妈去世 他妈的
            case 2:
                return require("../../../../images/SignUp_Icon_Job.png");
            case 3:
                return require("../../../../images/SignUp_Icon_Cellphone.png");
            case 4:
                return require("../../../../images/SignUp_Icon_Showpoint.png");
            case 5:
                return require("../../../../images/SignUp_Icon_Time.png");
            case 6:
                return require("../../../../images/SignUp_Icon_Identify.png");
        }
    };
    _show_time_picker = ()=>{
        this.props.timePress && this.props.timePress();

    };
    _content_change = ()=>{
        this.props.model[this.props.item.property] = this.state.content;
    };

    _render_part = ()=>{
        switch (this.props.item.type){
            case 0://Content
                return (
                    <TextInput ref={textInput=>this.textInput = textInput } editable={ this.props.item.canEdit } numberOfLines={1}
                               value={this.state.content}
                               placeholder={this.props.item.placeContent}
                               style={[SubmitItemStyle.part_TextInput]}
                               onChangeText={(content)=>{
                                    this.setState({content},this._content_change);

                               }}
                    >
                    </TextInput>
                );
            case 1://Time
                return (<DatePicker
                    style={SubmitItemStyle.part_timeInput}
                    date={this.state.content}
                    mode="datetime"
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    minuteInterval={30}
                    onDateChange={(content) => {this.setState({content},this._content_change);}}
                    customStyles={{
                        dateIcon: {
                            marginTop:10,
                        },
                        dateInput: {
                            height:"100%",
                            borderColor:"white",
                            marginTop:10,
                        }
                    }}
                />);
                // (
                //     <Button onPress={this._show_time_picker}
                //             style={SubmitItemStyle.part_timeInput}
                //             textStyle={{fontSize:16,textAlign:"left"}}
                //             activeOpacity={1}
                //     >
                //         {
                //             this.state.content
                //         }
                //     </Button>
                // );
            case 2://Number
                return (<TextInput ref={textInput=>this.textInput = textInput } editable={ this.props.item.canEdit } numberOfLines={1}
                                   value={this.state.content}
                                   placeholder={this.props.item.placeContent}
                                   style={[SubmitItemStyle.part_TextInput]}
                                   onChangeText={(content)=>{
                                       this.setState({content},this._content_change);
                                   }}
                                   keyboardType="numeric"
                >
                </TextInput>)
            case 3://Code
                return (
                    <View style = {[SubmitItemStyle.part_Code_Container]}>
                        <TextInput ref={textInput=>this.textInput = textInput } style = {[SubmitItemStyle.part_Code_Content]}
                                   placeholder={this.props.item.placeContent}
                                   value={this.state.content}
                                   onChangeText={(content)=>{
                                       this.setState({content},this._content_change);
                                   }}
                        >

                        </TextInput>
                        <View style = {[SubmitItemStyle.part_Code_Button]}>
                            <Text style = {{
                                height:35,borderWidth:0.5,borderRadius:17.5,
                                lineHeight:35,
                                textAlign:"center",
                                paddingHorizontal:10,
                                borderColor:fontColor,
                                color:buttonColor
                            }}
                                  onPress={()=>{
                                      if(!this.isDisabled){return;}
                                      this.setState({title:`${this.time + 1}` + "s后重试"});
                                      this.disp = Observable.interval(1000).timeInterval().take(this.time + 2).subscribe(({value})=>{
                                          console.log(value);
                                          if(value == (this.time + 1)){
                                              this.setState({title:"获取验证码"});
                                              this.isDisabled = true;
                                          }else{
                                              this.setState({
                                                  title:`${this.time - value}` + "s后重试"
                                              });
                                          }
                                      });
                                      this.isDisabled = false;
                                      this.props.codePress && this.props.codePress();
                                  }}
                            >
                                {
                                    this.state.title
                                }
                            </Text>
                        </View>
                    </View>
                )
                break
        }
    };
    componentWillUnmount(){
        this.disp && this.disp.unsubscribe();
    }
    render(){
        return(
            <View style = { [this.props.style,SubmitItemStyle.item] }>
                <View style = { [SubmitItemStyle.icon ]} >
                    <Image source={this._getIconURL()}></Image>
                </View>
                <View style = { [SubmitItemStyle.title ]}>
                    <Text style={{textAlign:"left",fontSize:18}}>{this.props.item.name}</Text>
                </View>
                <View style = { [SubmitItemStyle.part ]} >
                    {
                        this._render_part()
                    }
                </View>
            </View>
        )
    }
}

SubmitItemView.propTypes = {
    item:PropTypes.object,
    model:PropTypes.object,
    index:PropTypes.number,
    codePress:PropTypes.func,
    timePress:PropTypes.func,
};