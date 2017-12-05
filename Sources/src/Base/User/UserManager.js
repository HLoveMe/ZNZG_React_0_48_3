/**
 * Created by zhuzihao on 2017/11/28.
 */
import { BehaviorSubject} from "rxjs/Rx"

export class  UserInfo{
    Authorization = null;
    exp = 0;
    iat = 0;
    nickname = "名字";
    headimgurl = "";
    uid = "";
    constructor(ops){
        this.exp = ops["exp"];
        this.iat = ops["iat"];
        this.nickname = ops["nickname"];
        this.headimgurl = ops["headimgurl"];
        this.uid = ops["uid"];
        this.Authorization = ops["token"];

    }
}
class _UserManager {
    isLogin = false;
    user = null;
    userSubject = new BehaviorSubject(null);//BehaviorSubject
    key = "UserInfoData";
    constructor(){
        this.userSubject.next(this.user);
        storage.load({
            key:this.key,
        }).then(result=>{
            this.user = new UserInfo(result);
            this.isLogin = true;// 不检查过期时间了
            this.userSubject.next(this.user);
        }).catch(err=>{
            //没有 或者出错
        })
    }

    userLogin = (result)=>{
        this.isLogin = true;
        this.user = new UserInfo(result);
        this.userSubject.next(this.user);
        storage.save({
            key:this.key,
            data:result
        })
    }
}

export const UserManager = new _UserManager();