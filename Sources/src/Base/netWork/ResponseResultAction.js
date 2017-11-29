/**
 * Created by zhuzihao on 2017/11/29.
 */

export class ResponseResult{
    success = true;
    error = null; //如果出现错误就会中断结果处理链
    result = null;

    constructor(success,error,result) {
        this.success = success;
        this.error = error;
        this.result = result;
    }

}

export class ResponseResultAction{
    constructor(){}
    /***
     *  ops 请求参数
     *  responseJson 得到的JSoN结果
     *
     *  是否进行拦截
     * */
    isActive(ops,responseJson){
        return false;
    }
    /***
     *  拦截动作   返回 新的结果
     *  return ResponseResul
     * */
    action(ResponseResult){
        return {};
    }
}

class _ResponseResultActionManager{
    _actions  = null;
    constructor(actions) {
        this._actions = actions || [];
    }
    addAction(action){
        if (action instanceof ResponseResultAction){
            this._actions.push(action);
        }
    }
    /**
     *  return result
     * */
    MapResponseAction(ops,json){
        let start = this._actions[0];
        let re_start = start.action(json);
        let result = re_start;
        for (var i = 1;i<this._actions.length;i++){
            let one = this._actions[i];
            if(one.isActive(ops,json)){
                result = one.action(result);
                if(result.error != null){
                    return result;
                }
            }
        }
        return result;
    }
}
class  ResponseResultActionStart extends ResponseResultAction{
    constructor() {
        super();
    }
    isActive(ops,responseJson){
        return true;
    }
    action(responseJson){
        return new ResponseResult(true,null,responseJson);
    }
}
export  const ResponseResultActionManager = new _ResponseResultActionManager([new ResponseResultActionStart()]);