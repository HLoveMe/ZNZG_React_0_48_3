/**
 * Created by zhuzihao on 2017/11/23.
 */
import React, { Component ,PropTypes} from 'react';
// import PropTypes from 'prop-types';

import { processColor,EdgeInsetsPropType} from 'react-native';
import { requireNativeComponent ,NativeModules,findNodeHandle} from 'react-native';
const  GHMapView = requireNativeComponent("GHMapView",FMapView);

export  class FMapView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            NativeModules,GHMapView
        };
    }

    componentDidMount(){
    }
    mapLoadComplate(){

    }
    render(){
        console.log(this.state)
        return (
            <GHMapView ref="GHMapView" { ...this.props }
                       onFinishloading={(e)=>{
                           this.mapLoadComplate();
                           this.props.mapLoadFinish && this.props.mapLoadFinish(e);
                       }}

            >
            </GHMapView>
        )
    }
}
FMapView.defaultProps = {
    enable3D:false,
    showCompass:false,
};

FMapView.propTypes = {
    onStartloading:PropTypes.func,
    onFailloading:PropTypes.func,
    mapLoadFinish:PropTypes.func.isRequired,
    enable3D:PropTypes.bool,
    showCompass:PropTypes.bool,
};
