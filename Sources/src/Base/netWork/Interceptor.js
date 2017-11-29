/**
 * Created by zhuzihao on 2017/11/28.
 */
import {Subject} from 'rxjs/Rx';
import { HttpMethod } from "./Http"
class HttpInterceptorHandler{
    interceptors = [];
    index = 0;
    constructor(interceptors,func){
        this.interceptors = interceptors;
        this.func = func;
        this.index = 0;
    }
    nextInterceptor(){
        this.index += 1;
        let interceptor = this.interceptors[this.index];
        return interceptor;
    }
}
export class Interceptor{
    /**
     *  option  HttpRequestOption
     *  next (option)=>{return Observe}
     *  return Observe
     *  自定义拦截器 仅仅需要重写该方法即可
     *
     *  可以对请求参数进行拦截  对返回Response 进行扩展操作 不能修改
     * */
    intercept(option,next){
        /**
         *  return next(option).do((response)=>{
         *
         *  })
         * */
        return next(option);
    }
    _intercept(ops,inter){
        return this.intercept(ops,(ops)=>{
            let interceptor = inter.nextInterceptor();
            if (interceptor instanceof InterceptorEnd){
                return interceptor.intercept(ops,(ops,sub)=>{
                    inter.func(ops,sub);
                });
            }
            return interceptor._intercept(ops,inter);
        })
    }
}
class NetWorkManagerInterceptor{
    /***
     *
     *
     * */
    constructor(ops) {
        this.interceptors = ops;
    }
    /**
     *  类实例
     * */
    addInterceptor = (interceptor)=>{
        if(interceptor instanceof Interceptor){
            let last = this.interceptors.pop();
            this.interceptors.push(interceptor);
            this.interceptors.push(last);
        }
    };

    /**
     *  无返回值
     * */
    MapInterceptor(ops,func){
        this.interceptors[0]._intercept(ops,new HttpInterceptorHandler(this.interceptors,func)).subscribe(()=>{});
    }
}



class  GETBodyInterceptor extends Interceptor{
    constructor(){
        super()
    }
    intercept(option,next){
        if(option.method == HttpMethod.GET && option.body != null){
            let  body = option.body;
            let  url = option.url;
            let paramsArray = [];
            //拼接参数
            Object.keys(body).forEach(key => paramsArray.push(key + '=' + body[key]));
            if(paramsArray.length >= 1){
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
            option["url"] = url;
        }
        return next(option);
    }
}

class InterceptorEnd extends Interceptor{
    intercept(option,next){
        let sub = new Subject();
        if(option.method == HttpMethod.GET && option.body != null){
            delete option["body"];
            next(option,sub);
        }
        return sub;
    }
}

export const  InterceptorManager = new NetWorkManagerInterceptor([
    new  GETBodyInterceptor(),new InterceptorEnd()
]);