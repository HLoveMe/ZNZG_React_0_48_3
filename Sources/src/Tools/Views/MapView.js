/**
 * Created by zhuzihao on 2017/11/23.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { processColor,EdgeInsetsPropType} from 'react-native';
import { requireNativeComponent ,NativeModules,findNodeHandle} from 'react-native';
const  GHMapView = requireNativeComponent("GHMapView",FMapView);
const  { GHMapViewManager ,GHMapNodeManager} = NativeModules;
export  class FMapView extends Component{
    constructor(props) {
        super(props);
        this.state = {_loadFinish:false};
        console.log(this.props)
    }
    //GHMapViewManager.nodeClick
    componentDidMount(){
        console.log(NativeModules);
        // debugger
        // GHMapViewManager.nodeClick = (a,b)=>{
        //     console.log(a,b);
        // }

    }

    getMapCener=()=>{
        if(this.state._loadFinish){return this.state.mapCenter;}
    };
    getMapDisplayIds = ()=>{
        if(this.state._loadFinish){return this.state.displayIDs;}
    };
    /**得到当前ID 异步*/
    getCurrentId =()=>{
        return new Promise((resolve,reject)=>{
            GHMapViewManager.getCurrentDisplayID(this._handle(),(currentID)=>{
                this.setState({currentID});
                resolve(currentID);
            });
        });
    };
    /**设置地图当前ID*/
    configCurrentMapID=(id)=>{
        GHMapViewManager.setCurrentID(this._handle(),id);
    }
    //设置地图 Node选中状态
    selectNode = (seletNode,cancalNode)=>{
      /**
       *  seletNode为设置选中的
       *  cancalNode可选 取消选择
       * */
      GHMapNodeManager.selectNode(this._handle(),seletNode,cancalNode);
    };
    /**开始显示自己位置 开始定位*/
    startLocation = ()=>{
        GHMapViewManager.startLocation(this._handle());
    }
    /**
     * key 搜索关键字
     * handle 结果回调(results){}
     * */
    seachModelsByKey = (key,handle)=>{
        GHMapViewManager.Search(this._handle(),key,handle);
    };
    //聚焦
    focusNode=(FID)=>{
        GHMapViewManager.focusNode(this._handle(),FID);
    };
    _mapLoadComplate=()=>{
        // GHMapViewManager.getMapCenter(this._handle(),(center)=>{
        //     this.mapCenter = center;
        // });
        // GHMapViewManager.getDisplayIDs(this._handle(),(ids)=>{
        //     this.displayIDs = ids;
        // });
        // GHMapViewManager.getCurrentDisplayID(this._handle(),(id)=>{
        //     this.currentID = id;
        // })
    };
    _mapNodeSelect = (e)=>{
      //node被选择
    };
    _handle=()=>{
        return findNodeHandle(this.refs.GHMapView);
    };
    render(){
        return (
            <GHMapView ref="GHMapView" { ...this.props }
                       onFinishloading={(e)=>{
                           this._mapLoadComplate();
                           this.setState({
                               displayIDs:e.nativeEvent.displayIDs,
                               currentID:e.nativeEvent.currentID,
                               mapCenter:e.nativeEvent.mapCenter,
                               initMapInfo:e.nativeEvent.mapInfo,
                               _loadFinish:true,
                           },this.props.mapLoadFinish);
                       }}
                       onMapNodeClick = {(a)=>{
                           this._mapNodeSelect(a.nativeEvent);
                           this.props.onNodeClick  && this.props.onNodeClick(a.nativeEvent);
                       }}

            >
            </GHMapView>
        )
    }
}
/**
 * any= {
     *  inclineAngle:number 3d切斜角度
     *  rotateAngle:number 旋转角度
     *  zoomLevel:int  当前缩放
     *  rulerRatio:number 比例尺
     *  zoomRange:{ 缩放比例
     *      min:number, 最小
     *      max:number  最大
     *  }

     *
     *  Space最佳
     *  let zoomLevel:Int32 = 21
     *  let rulerRatio:CGFloat = 333.618530273438
     *  let rotateAngle:Float = 80.9955597
     * }
 * */
FMapView.defaultProps = {
    enable3D:false,
    showCompass:false,
    MapStatus:{
        zoomLevel: 21,
        rulerRatio: 333.618530273438,
        rotateAngle: 80.9955597,
    }
};

FMapView.propTypes = {
    onStartloading:PropTypes.func,
    onFailloading:PropTypes.func,
    mapLoadFinish:PropTypes.func.isRequired,
    onNodeClick:PropTypes.func.isRequired,
    enable3D:PropTypes.bool,
    showCompass:PropTypes.bool,
    MapStatus:PropTypes.shape({
        inclineAngle:PropTypes.number,
        rotateAngle:PropTypes.number,
        zoomLevel:PropTypes.number,
        rulerRatio:PropTypes.number,
        zoomRange:PropTypes.shape({
            min:PropTypes.number,
            max:PropTypes.number
        })
    })
};
