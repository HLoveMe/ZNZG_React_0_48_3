/**
 * Created by zhuzihao on 2017/11/22.
 */
import React, { Component } from 'react';
import { StyleSheet, View ,Text,Image,requireNativeComponent} from 'react-native';
import PXHandle from "./src/Tools/PXHandle"
import { bkColor } from  "./src/Tools/commandColors"
import Button from 'apsl-react-native-button'
import  {FMapView}  from "./src/Tools/Views/MapView"
import Search from 'react-native-search-box';


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
    },
    User:{
        position:"absolute",
        left:10,
        bottom:0,
        width:60,
        height:60,
        borderWidth:0,
        zIndex:10
        // backgroundColor:"red",
    },
    Search:{
        position:"absolute",
        zIndex:10,
        top:30,
        left:40,
        right:40,
        // height:44,
        backgroundColor:"red",
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
MainFuncName.User = 9;

export default class MainViewController extends Component{
    constructor(ops){
        super(ops);
        this.state = {
            enable3D:false,
            showCompass:false,
        }
        /**
         * 选中的节点
         * */
        this.mapNode = null;

    }
    OperationClick = (type)=>{
        console.log(type);
        switch (type){
            case MainFuncName.MapType:{
                //地图状态
                this.setState({enable3D:!this.state.enable3D});
                break
            }
            case MainFuncName.User:{
                console.log(111)
                break
            }

        }
    };
    componentDidMount(){
        //显示地图

    }
    maploadFinish=()=>{
        console.log(this.refs.FMapView.getMapDisplayIds());
        this.refs.FMapView.startLocation()
    };
    onNodeClick = (e)=>{
      this.refs.FMapView.selectNode(e,this.mapNode);
        this.mapNode = e;
    };
    render(){
        return (
            <View style={ MianStyle.Main }>
                <FMapView ref="FMapView" style={ MianStyle.Map } mapLoadFinish={ this.maploadFinish }
                          showCompass={this.state.showCompass}
                          enable3D={this.state.enable3D}
                          onNodeClick = {
                              this.onNodeClick
                          }
                >
                </FMapView>

                <Button style={ MianStyle.User } onPress={()=>this.OperationClick(MainFuncName.User)}>
                    <Image style={ MianStyle.FuncIcon}
                        source={ require("../images/home/Index_Person_on.png") }
                    >

                    </Image>
                </Button>

                <View style = {MianStyle.Search}>
                    <Search backgroundColor="blue">

                    </Search>
                </View>

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