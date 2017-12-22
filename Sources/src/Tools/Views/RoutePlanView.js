/**
 * Created by zhuzihao on 2017/12/13.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,Image  ,Animated,Text} from 'react-native';
import Button from 'apsl-react-native-button'
import PXHandle from  "../PXHandle"
import {fontColor} from "../commandColors"
const MainStyle = StyleSheet.create({
    RoutePlanConnent:{
        height:"100%",
        borderRadius:10,
        overflow:"hidden"
    },
    RoutePlanConnentClose:{
        backgroundColor:"#f5f5f5",
        position:"absolute",
        width:30,
        height:30,
        right:0,
        zIndex:10
    },
    RoutePart:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"white"
    },
    RoutePartIcon:{
        width:PXHandle.PXHeight(130),
        height:"100%",
    },
    RoutePartInput:{
        flex:1,
        justifyContent:"center",
        paddingLeft:10,
    },
    RoutePartInputText:{
        fontSize:20,
        color:fontColor
    }
});

export class RoutePlanView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            points:[]
        }
    }
    /***
        point:{
            title:"",
            location:{

            }
        }
     * */
    setPointLocation = (point)=>{
        points = this.state.points;
        if(points.length == 2){points == [];}
        points.push(point);
        this.setState({
            points
        })
    };
    render(){
        return (
            <Animated.View {...this.props}>
                <View style = {[MainStyle.RoutePlanConnent]}>
                    <Button style={[MainStyle.RoutePlanConnentClose]} onPress={()=>{this.props.close && this.props.close()}}>
                        X
                    </Button>
                    <View style = {[MainStyle.RoutePart]}>
                        <Image style = {[MainStyle.RoutePartIcon]} source={require("../../../../images/start_icon.png")}
                               resizeMode="center"
                        ></Image>
                        <View style = {[MainStyle.RoutePartInput]}>
                            <Text style={MainStyle.RoutePartInputText}>
                                {
                                    this.state.points.length >= 1 ? this.state.points[0].title : "从这里出发"
                                }
                            </Text>
                        </View>
                    </View>
                    <View style = {[MainStyle.RoutePart]}>
                        <Image style = {[MainStyle.RoutePartIcon]} source={require("../../../../images/end_icon.png")}
                               resizeMode="center"
                        ></Image>
                        <View style = {[MainStyle.RoutePartInput]}>
                            <Text style={MainStyle.RoutePartInputText}>
                                {
                                    this.state.points.length == 2 ? this.state.points[1].title : "到这里去"
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    }

}
RoutePlanView.propTypes = {
    close:PropTypes.func
};