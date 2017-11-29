/**
 * Created by zhuzihao on 2017/11/29.
 */

import  { ResponseResultAction } from "../netWork/ResponseResultAction"


export   class ZHZGReponseResultAction extends  ResponseResultAction{
    constructor(){
        super();
    }
    isActive(ops,responseJson){
        if(responseJson.res_status == 1){
            //正确返回信息
            return true;
        }
        return false;
    }
    action(result){

        let res = result.result;
        result.result = res.res_body;
        return result;
    }
}
export class ZNZGReponseMessasgeAction extends ResponseResultAction{
    _handle = null;
    constructor(handle){
        super();
        this._handle = handle;
    }
    isActive(ops,responseJson){
        if(responseJson.res_status == -1){
            //未登入
            this._handle && this._handle(responseJson.res_msg);
            return true;
        }
        return false;
    }
    action(result){
        result.error = new Error("请求失败"+result.result.res_msg);
        return result;
    }
}

export class  ZNZGUserPowerAction extends  ResponseResultAction{
    _handle = null;
    constructor(handle){
        super();
        this._handle = handle;
    }
    isActive(ops,responseJson){
        if(responseJson.res_status == 0){
            //未登入
            this._handle && this._handle();
            return true;
        }
        return false;
    }
    action(result){
        result.error = new Error("未登入");
        return result;
    }
}