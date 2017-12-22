/**
 * Created by zhuzihao on 2017/11/29.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,Image ,TouchableOpacity,Text ,Animated} from 'react-native';

import Slider from "react-native-slider";
import Sound from 'react-native-sound';
Sound.setCategory('Playback', true);
const  MusicStyle = StyleSheet.create({
    Button:{
        height:"100%",
        width:44,
        position:"absolute",
        justifyContent:"center",
        alignItems:"center"
    },
    ButtonReset:{
        left:5
    },
    ButtonPlay:{
        left:50,
    },
    ButtonRemove:{
        right:5
    },
    ProgressContainer:{
        height:"100%",
        marginLeft:98,
        marginRight:54,
    },
    slide:{
        height:20,
        marginTop:5
    },
    track: {
        height: 2,
        backgroundColor: '#303030',
    },
    thumb: {
        width: 8,
        height: 8,
        backgroundColor: '#31a4db',
        borderRadius: 10 / 2,
        shadowColor: '#31a4db',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    musicText:{
        position:"absolute",
        bottom:3,
        color:"white",
        fontSize:12
    },
    progress:{
        left:0
    },
    duration:{
        right:0
    }
});
export  class MusicPlayView extends Component{
    constructor(ops){
        super(ops);
        this.state = {
            node:this.props.node,
            play:true,
            rotateV:new Animated.Value(0),
            duration:0,
            progress:0,
            progressText:"00:00",
            durationText:"00:00"
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
                    clearInterval(this.inter);
                    clearInterval(this._progress);
                    Sound.setActive(false);
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
        clearInterval(this._progress);
        Sound.setActive(false);
    }
    _startAnimation = ()=>{
        this.Animated = Animated.loop(Animated.timing(this.state.rotateV,{
            toValue:360,
            duration:5000,
            useNativeDriver:true
        }));
        this.Animated.start();
        this.inter = setInterval(()=>{
            this.sound.getCurrentTime((v,b)=>{
               if(b && this.inter != -1){
                   this.Animated.stop();
                   clearInterval(this.inter);
                   this.inter = -1;
                   this._listenProgress();
               }
            });
        },200)
    };
    _listenProgress = ()=>{
        let duration = this.sound.getDuration();
        let durationText = this._getTimeString(duration);
        this.setState({duration,durationText});
        this.__listenProgress();
        this._progress = setInterval(this.__listenProgress,1000);
    };
    __listenProgress = ()=>{
        this.sound.getCurrentTime((progress)=>{
            let progressText = this._getTimeString(progress);
            this.setState({
                progress,progressText
            });
        });


    };
    _getTimeString = (time)=>{
        let minute = parseInt(time / 60 + "");
        let ss = parseInt(time % 60 + "");
        if(ss < 10){
            return minute+":0"+ss
        }else{
            return minute+":"+ss
        }
    };
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
                    <Slider style={ MusicStyle.slide } value={ this.state.progress >= 1 ? this.state.progress / this.state.duration :0 }
                            disabled = {true}
                            trackStyle={ MusicStyle.track }
                            thumbStyle={ MusicStyle.thumb }
                            minimumTrackTintColor = "#31a4db"
                            maximumTrackTintColor = "#ffffff"
                    >

                    </Slider>
                    <Text style={ [MusicStyle.progress,MusicStyle.musicText] }>
                        {
                            this._getTimeString(this.state.progress)
                        }
                    </Text>
                    <Text style={ [MusicStyle.duration,MusicStyle.musicText] }>
                        {
                            this._getTimeString(this.state.duration)
                        }
                    </Text>
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