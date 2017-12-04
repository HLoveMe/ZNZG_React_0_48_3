/**
 * Created by zhuzihao on 2017/11/22.
 */
import React, { Component } from 'react';
import { StyleSheet, View ,Text,Image,requireNativeComponent,Keyboard,Modal,NativeModules} from 'react-native';
import PXHandle from "./src/Tools/PXHandle"
import { buttonColor } from  "./src/Tools/commandColors"
import Button from 'apsl-react-native-button'
import  {FMapView}  from "./src/Tools/Views/MapView"
import Search from 'react-native-search-box';
import {Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import { SettingNavigator } from "./src/settings/SettingConfig"
import { NodeNavigator} from "./src/nodes/NodeInfoConfig"
import { NetWorkManager } from "./src/Base/netWork/NetWorkManager"
import { HttpMethod } from "./src/Base/netWork/Http"
var ReactNative = require('react-native');
import { AutoAuthorization } from "./src/Base/znzg_network/ZNZGInterceptor";
import { InterceptorManager } from "./src/Base/netWork/Interceptor"
import { ResponseResultActionManager } from "./src/Base/netWork/ResponseResultAction"
import {ZHZGReponseResultAction,ZNZGReponseMessasgeAction,ZNZGUserPowerAction} from "./src/Base/znzg_network/ZNZGReponseResult"
import { MusicPlayView } from "./src/Tools/Views/MusicPlayView"
const  MainStyle = StyleSheet.create({
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
    SearchC:{
        position:"absolute",
        zIndex:10,
        top:30,
        left:20,
        right:20,
    },
    Search:{},
    SeachResult:{},
    SeachResultText:{
        paddingLeft:20,
        lineHeight:44,
        height:44,
    },
    Music:{
        position:"absolute",
        height:44,
        width:"100%",
        backgroundColor:buttonColor,
        zIndex:10,
        marginTop:80,
    }

});
const ModalStyle = StyleSheet.create({
    Message:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    MessageTextC:{
        backgroundColor:"#f5f5f5",
        height:80,
        paddingHorizontal:30,
        borderRadius:10,
        justifyContent:"center",
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
MainFuncName.User = 10;

export default class MainViewController extends Component{
    constructor(ops){
        super(ops);
        this.state = {
            enable3D:false,
            showCompass:false,
            placeholder:"输入展会的名称",
            settingModalVisible:false,
            /***/
            nodeModalVisible:false,
            currentNode:null,
            /***/
            modalMessage:"",
            modalMessageShow:false,

            /***/
            musicPlay:false
        };
        /**
         * 选中的节点
         * */
        this.mapNode = null;
        this.SeachSub = new Subject();
        this.InputSeach();
        this.handleNetwork();

        this.nodes = [];
    }
    //同一处理网络信息
    handleNetwork = ()=>{
        //处理网络 认证信息
        InterceptorManager.addInterceptor(AutoAuthorization);

        ResponseResultActionManager.addAction(new ZNZGUserPowerAction(()=>{
            //未登入
        }));
        ResponseResultActionManager.addAction(new ZNZGReponseMessasgeAction((modalMessage)=>{
            //错误信息展示
            this.showMessage(modalMessage);
        }));
        ResponseResultActionManager.addAction(new ZHZGReponseResultAction());
    };
    //显示提示信息
    showMessage = (modalMessage)=>{
        clearTimeout(this.msg_timeout);
        this.setState({modalMessage,modalMessageShow:true},()=>{
            this.msg_timeout = setTimeout(()=>{
                this.setState({modalMessageShow:false})
            },750)
        })
    }
    /**
     * 功能点击
     * */
    OperationClick = (type)=>{
        console.log(type);
        switch (type){
            case MainFuncName.MapType:{
                //地图状态
                this.setState({enable3D:!this.state.enable3D});
                break
            }
            case MainFuncName.User:{
                this.setState({
                    settingModalVisible:true,
                });
                break
            }

        }
    };
    componentDidMount(){
        Keyboard.addListener("keyboardWillHide",()=>{
            this.refs.Search.onCancel();
        });
        //加载必要资源
        NetWorkManager.NetWork("http://ah.vr68.com/apiv1/exhibition/list",HttpMethod.GET).subscribe((res)=>{
            if(res.success && res.error == null){
                this.nodes = res.result;
            }
        });
    }
    maploadFinish=()=>{
        console.log(this.refs.FMapView.getMapDisplayIds());
        this.refs.FMapView.startLocation()
    };
    //选中地图节点
    onNodeClick = (e)=>{
        this.refs.FMapView.selectNode(e,this.mapNode);
        this.mapNode = e;
        let select = null;
        if(this.nodes.length > 0){
            for(var index in this.nodes){
                let one = this.nodes[index];
                if(one.fid == e.FID){
                    select = one;
                    break;
                }
            }
        }
        if(select  != null){
            ReactNative.takeSnapshot("window",{format:"png",quality:0.4}).then((bkurl)=>{
                this.setState({
                    nodeModalVisible:true,
                    bkurl,
                    currentNode:select
                });
            })
        }else {
            this.showMessage("没有信息");
        }

    };
    //输入字符
    InputSeach = (sub)=>{
        this.SeachSub.delay(300).debounceTime(500).distinctUntilChanged().subscribe((e)=>{
            this.refs.FMapView.seachModelsByKey(e,(results)=>{
                this.setState({results});
                console.log(results);
            });
        })
    };
    //点击搜索节点
    _clickSeacResult = (node)=>{
        this.refs.Search.onCancel();
        this.setState({results:[]});
        this.refs.FMapView.focusNode(node.FID);
    };
    //显示搜索结果
    _seachResults = ()=>{
        if(this.state.results==null || this.state.results.length==0){return null;}
        var _result = [];
        for(var index in this.state.results){
            let one = this.state.results[index];
            _result.push(
                (
                    <View key={one.name} style={ MainStyle.SeachResult }>
                        <Text  style={ MainStyle.SeachResultText }
                               onPress={ ()=>{
                                  this._clickSeacResult(one);
                               } }
                        >{one.name}</Text>
                    </View>
                )
            )
        }
        return _result;
    };
    //移除Node 信息界面
    _dismiss=(index)=>{
        this.setState({
            settingModalVisible:false,
            nodeModalVisible:false,
        });
        if(index == 1){
            this.setState({
                musicPlay:true
            });
        }
    };

    render(){
        return (
            <View style={ MainStyle.Main }>
                {
                    this.state.musicPlay ? (
                        <MusicPlayView style = { MainStyle.Music }
                                       node = {this.state.currentNode}
                                       remove={ ()=>{
                                           this.setState({
                                               musicPlay:false
                                           })
                                       } }
                        >

                        </MusicPlayView>
                    ) : null

                }
                <FMapView ref="FMapView" style={ MainStyle.Map } mapLoadFinish={ this.maploadFinish }
                          showCompass={this.state.showCompass}
                          enable3D={this.state.enable3D}
                          onNodeClick = {
                              this.onNodeClick
                          }
                >
                </FMapView>

                <Button style={ MainStyle.User } onPress={()=>this.OperationClick(MainFuncName.User)}>
                    <Image style={ MainStyle.FuncIcon}
                        source={ require("../images/home/Index_Person_on.png") }
                    >

                    </Image>
                </Button>

                <View style = {MainStyle.SearchC}>
                    <Search ref="Search" backgroundColor="rgba(100,100,100,0.3)"
                            cancelTitle= { "取消"}
                            placeholder= {this.state.placeholder}
                            cancelButtonStyle={{width:44}}
                            cancelButtonViewStyle={{width:44}}
                            cancelButtonWidth = {60}
                            /**onSearch = { (e)=>this.SeachSub.next(e) }*/
                            onChangeText = { (e)=>this.SeachSub.next(e) }
                            onCancel={ ()=>{
                                this.setState({results:[]})
                            } }
                    >
                    </Search>
                    {
                        this._seachResults()
                    }
                </View>

                <View style={ MainStyle.LeftFuncs }>
                    {/** 左侧功能 */}
                    <Button style={ [MainStyle.LeftFunc,MainStyle.FuncTitle] } textStyle={ {fontSize:20 }} onPress={()=>this.OperationClick(MainFuncName.MapType)}>
                        { this.state.enable3D ? "3" : '2' }
                    </Button>
                        <Button style={ MainStyle.LeftFunc } onPress={()=>this.OperationClick(MainFuncName.RoutePlan)}>
                            <Image style={ MainStyle.FuncIcon}
                               source={ require("../images/home/Index_Button_LeftRoad_on_normal.png") }
                            >
                            </Image>
                        </Button>

                    <Button style={ MainStyle.LeftFunc } onPress={()=>this.OperationClick(MainFuncName.HotMap)}>
                        <Image style={ MainStyle.FuncIcon}
                               source={ require("../images/home/Index_Button_Hot_on_normal.png") }
                        >
                        </Image>
                    </Button>
                    <Button style={ MainStyle.LeftFunc } onPress={()=>this.OperationClick(MainFuncName.Location)}>
                        <Image style={ MainStyle.FuncIcon}
                               source={ require("../images/home/Index_Button_Leftfixed_on_normal.png") }
                        >
                        </Image>
                    </Button>
                </View>

                <View style={ MainStyle.RightFuncs }>
                    {/* 楼层 */}
                    <View style={ MainStyle.RightOneFuncs }>
                        <Button style={ [MainStyle.RightOneFunc,{borderWidth:1,borderColor:buttonColor}] } onPress={()=>this.OperationClick(MainFuncName.Floors)}>
                            <Text style={ MainStyle.FuncTitleFloor }>
                                1
                            </Text>
                            </Button>
                    </View>
                    {/* 功能 */}
                    <View style={ MainStyle.RightOneFuncs }>
                        {/* 功能 */}
                        <Button style={ MainStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.Scan)}>
                            <Image style={ MainStyle.FuncIcon}
                                   source={ require("../images/home/scan_normal.png") }
                            >
                            </Image>
                        </Button>
                        <Button style={ MainStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.Panorama)}>
                            <Image style={ MainStyle.FuncIcon}
                                   source={ require("../images/home/quanjing_normal.png") }
                            >
                            </Image>
                        </Button>
                        <Button style={ MainStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.Ecommendation)}>
                            <Image style={ MainStyle.FuncIcon}
                                   source={ require("../images/home/route_normal.png") }
                            >
                            </Image>
                        </Button>
                        <Button style={ MainStyle.RightOneFunc } onPress={()=>this.OperationClick(MainFuncName.HallMeet)}>
                            <Image style={ MainStyle.FuncIcon}
                                   source={ require("../images/home/zhanhui_normal.png") }
                            >
                            </Image>
                        </Button>
                    </View>
                </View>
                <Modal  visible = { this.state.settingModalVisible }
                       animationType = { "slide" }
                        transparent = { true }
                >
                    <SettingNavigator  screenProps={{"dismiss":this._dismiss}}/>
                </Modal>
                <Modal  visible = { this.state.nodeModalVisible }
                        animationType = { "fade" }
                        transparent = { true }
                >
                    <NodeNavigator  screenProps={{"dismiss":this._dismiss,bkurl:this.state.bkurl,currentNode:this.state.currentNode}}/>
                </Modal>
                <Modal visible={ this.state.modalMessageShow }
                       transparent = { true }
                >
                        <View style = { ModalStyle.Message }>
                            <View style={ ModalStyle.MessageTextC }>
                                <Text>
                                    { this.state.modalMessage }
                                </Text>
                            </View>
                        </View>
                </Modal>
            </View>
        );
    }
}

/**
 *
 * */