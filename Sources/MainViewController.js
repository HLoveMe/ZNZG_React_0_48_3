/**
 * Created by zhuzihao on 2017/11/22.
 */
import React, { Component } from 'react';
import { StyleSheet, View ,Text,Image,requireNativeComponent} from 'react-native';
import PXHandle from "./src/Tools/PXHandle"
import { bkColor } from  "./src/Tools/commandColors"
import Button from 'apsl-react-native-button'
import  {FMapView}  from "./src/Tools/Views/MapView"

const  MianStyle = StyleSheet.create({
   Main:{
       flex:1,
   },
    Map:{
        flex:1,
        backgroundColor:'white',
    },
    LeftFuncs:{
        position:"absolute",
        left:10,
        height:"100%",
        width:PXHandle.PXWidth(98),
        justifyContent:"center",
        alignItems:"center"

    },
    LeftFunc:{
        width:"100%",
        height:PXHandle.PXWidth(98),
        marginTop:20,
        overflow:"hidden",
        borderRadius:PXHandle.PXWidth(49),
        borderWidth:0

    },
    RightFuncs:{
        flex:1,
        position:"absolute",
        width:PXHandle.PXWidth(98),
        right:10,
        height:"100%",
        flexDirection:"column"
    },
    RightOneFuncs:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    RightOneFunc:{
        width:"100%",
        height:PXHandle.PXWidth(98),
        marginTop:10,
        borderRadius:PXHandle.PXWidth(20),
        overflow:"hidden",
        borderWidth:0
    },
    FuncIcon:{
        width:"100%",
        height:"100%",
    },
    FuncTitle:{ //地图3 2 D
        width:PXHandle.PXWidth(98),
        height:PXHandle.PXWidth(98),
        backgroundColor:"yellow"
    },
    FuncTitleFloor: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        backgroundColor: "white",
        lineHeight: PXHandle.PXWidth(98),
        fontSize: 20,
    }
});
function MainFuncName() {}
MainFuncName.MapType = 0;
MainFuncName.RoutePlan = 1;
MainFuncName.HotMap = 2;
MainFuncName.Location = 3;
MainFuncName.Floors = 4;
MainFuncName.Scan = 5;
MainFuncName.Panorama = 6;
MainFuncName.Ecommendation = 7;
MainFuncName.HallMeet = 8;
MainFuncName.Seacher = 9;

export default class MainViewController extends Component{
    constructor(ops){
        super(ops);
        this.state = {
            enable3D:false,
            showCompass:false,
        }
    }
    OperationClick = (type)=>{
        console.log(type);
        switch (type){
            case MainFuncName.MapType:{
                this.setState({enable3D:!this.state.enable3D});
                break
            }

        }
    };
    componentDidMount(){
        //显示地图
    }

    render(){
        return (
            <View style={ MianStyle.Main }>
                <FMapView style={ MianStyle.Map } mapLoadFinish={()=>{

                }}
                          showCompass={this.state.showCompass}
                          enable3D={this.state.enable3D}
                >

                </FMapView>
                <View style={ MianStyle.LeftFuncs }>
                    {/** 左侧功能 */}
                    <Button style={ [MianStyle.LeftFunc,MianStyle.FuncTitle] } textStyle={ {fontSize:20 }} onPress={()=>this.OperationClick(MainFuncName.MapType)}>
                        { this.state.enable3D ? "3" : '2' }
                    </Button>
                        <Button style={ MianStyle.LeftFunc } onPress={()=>this.OperationClick(MainFuncName.RoutePlan)}>
                            <Image style={ MianStyle.FuncIcon}
                               source={ require("../images/home/Index_Button_LeftRoad_on_normal.png") }
                            >
                            </Image>
                        </Button>

                    <Button style={ MianStyle.LeftFunc } onPress={()=>this.OperationClick(MainFuncName.HotMap)}>
                        <Image style={ MianStyle.FuncIcon}
                               source={ require("../images/home/Index_Button_Hot_on_normal.png") }
                        >
                        </Image>
                    </Button>
                    <Button style={ MianStyle.LeftFunc } onPress={()=>this.OperationClick(MainFuncName.Location)}>
                        <Image style={ MianStyle.FuncIcon}
                               source={ require("../images/home/Index_Button_Leftfixed_on_normal.png") }
                        >
                        </Image>
                    </Button>
                </View>

                <View style={ MianStyle.RightFuncs }>
                    {/* 楼层 */}
                    <View style={ MianStyle.RightOneFuncs }>
                        <Button style={ [MianStyle.RightOneFunc,{borderWidth:1,borderColor:bkColor}] } onPress={()=>this.OperationClick(MainFuncName.Floors)}>
                            <Text style={ MianStyle.FuncTitleFloor }>
                                1
                            </Text>
                            </Button>
                    </View>
                    {/* 功能 */}
                    <View style={ MianStyle.RightOneFuncs }>
                        {/* 功能 */}
                        <Button style={ MianStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.Scan)}>
                            <Image style={ MianStyle.FuncIcon}
                                   source={ require("../images/home/scan_normal.png") }
                            >
                            </Image>
                        </Button>
                        <Button style={ MianStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.Panorama)}>
                            <Image style={ MianStyle.FuncIcon}
                                   source={ require("../images/home/quanjing_normal.png") }
                            >
                            </Image>
                        </Button>
                        <Button style={ MianStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.Ecommendation)}>
                            <Image style={ MianStyle.FuncIcon}
                                   source={ require("../images/home/route_normal.png") }
                            >
                            </Image>
                        </Button>
                        <Button style={ MianStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.HallMeet)}>
                            <Image style={ MianStyle.FuncIcon}
                                   source={ require("../images/home/zhanhui_normal.png") }
                            >
                            </Image>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}