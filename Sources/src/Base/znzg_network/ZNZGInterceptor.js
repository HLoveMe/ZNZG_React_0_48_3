/**
 * Created by zhuzihao on 2017/11/28.
 */


/**
 *  为满足 ZNZG 需要编写
 * */
import { Interceptor } from "../netWork/Interceptor"
import { UserInfo,UserManager } from "../User/UserManager"

class _AutoAuthorization extends  Interceptor{
    user = null;//UserInfo
    _Authorization = "朱子豪";
    /** 使用 初始化 */
    constructor(ops){
        super(ops);
        UserManager.userSubject.subscribe((user)=>{
            this.user = user;
        })
    }
    intercept(option,next){
        let headers  = option.headers;
        headers["Authorization"] = this.user ? (this.user.Authorization || this._Authorization) : this._Authorization;
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        option.headers = headers;
        return next(option);
    }
}

export  const AutoAuthorization = new _AutoAuthorization();

