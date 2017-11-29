/**
 * Created by zhuzihao on 2017/11/29.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,Image ,TouchableOpacity,Text ,Animated} from 'react-native';
import PXHandle from  "../PXHandle"
import Sound from 'react-native-sound';
Sound.setCategory('Playback', true);
const  MusicStyle = StyleSheet.create({
    Button:{
        height:"100%",
        width:44,
        backgroundColor:"orange",
        position:"absolute",
        justifyContent:"center",
        alignItems:"center"
    },
    ButtonReset:{
        left:10
    },
    ButtonPlay:{
        left:54,
    },
    ButtonRemove:{
        right:10
    },
    ProgressContainer:{
        backgroundColor:"blue",
        height:"100%",
        marginLeft:98,
        marginRight:54,
    }
});
export  class MusicPlayView extends Component{
    constructor(ops){
        super(ops);
        this.state = {
            node:this.props.node,
            play:true,
            rotateV:new Animated.Value(0),
        };
        this.sound = null;
        this.Animated = null;
        Sound.setActive(true);
    }
    componentDidMount(){
        let url = this.state.node.voice;
        this.sound =new Sound(url,undefined,(e)=>{
            //资源加载完
            if(e == null){
                this.setState({play:true});
                this.sound.play(()=>{
                   /**完成*/
                   this.sound.release();
                    this.props.remove();
                });
            }
        });
        this._startAnimation();
    }
    componentWillUnmount(){
        this.Animated.stop();
        this.sound.release();
        clearInterval(this.inter);
        Sound.setActive(false);
    }
    _startAnimation = ()=>{
        console.log("loading",this.sound.isLoaded());
        this.Animated = Animated.loop(Animated.timing(this.state.rotateV,{
            toValue:360,
            duration:5000,
            useNativeDriver:true
        }));
        this.Animated.start();
        this.inter = setInterval(()=>{
            this.sound.getCurrentTime((v,b)=>{
               if(b){
                   this.Animated.stop();
                   clearInterval(this.inter);
                   this._listenProgress();
               }
            });

        },200)
    };
    _listenProgress = ()=>{

    }
    _playPause = ()=>{
        let play = this.state.play;
        play ? this.sound.pause() : this.sound.play();
        play = !play;
        this.setState({play});
    };
    render(){
        return (
            <View style = {[this.props.style]}>
                <TouchableOpacity style = { [MusicStyle.Button,MusicStyle.ButtonReset] }
                                  activeOpacity = {0.8}
                                  onPress = { ()=>{
                                      this.sound.setCurrentTime(0);
                                      this.sound.play();
                                      this.setState({play:true});
                                  } }
                >
                    <Animated.Image source={require("../../../../images/Play_Reflesh_Button_Normal.png")}
                                    style = {{
                                        transform:[
                                            {
                                                rotate:this.state.rotateV.interpolate({
                                                    inputRange:[0,360],
                                                    outputRange:["0deg","360deg"]
                                                })
                                            }
                                        ]
                                    }}
                    >
                    </Animated.Image>
                </TouchableOpacity>
                <TouchableOpacity style = { [MusicStyle.Button,MusicStyle.ButtonPlay] }
                                  activeOpacity = {0.8}
                                  onPress = { this._playPause }
                >
                    <Image source={
                       this.state.play ? require("../../../../images/Play_Stop_Button_Normal.png") : require("../../../../images/Play_Play_Button_Normal.png")
                    }>
                    </Image>
                </TouchableOpacity>
                <View style = {MusicStyle.ProgressContainer}>
                    <Text>a</Text>
                </View>
                <TouchableOpacity style = { [MusicStyle.Button,MusicStyle.ButtonRemove] }
                                  activeOpacity = {0.8}
                                  onPress = { ()=>{
                                      this.sound.pause();
                                      this.sound.release();
                                      this.props.remove();
                                  } }
                >
                    <Image source={require("../../../../images/Play_Close_Button_Normal.png")}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }
}

MusicPlayView.propTypes = {
    node:PropTypes.object,
    remove:PropTypes.func.isRequired,
};