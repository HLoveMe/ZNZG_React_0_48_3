/**
 * Created by zhuzihao on 2017/11/28.
 */
import { Subject ,Observable} from "rxjs/Rx"

export class  UserInfo{
    Authorization = null;
}
class _UserManager {
    isLogin = false;
    user = null;
    userSubject = new Subject();
    constructor(){
        this.userSubject.next(this.user);
    }

    userLogin = ()=>{
        this.isLogin = true;
        this.user = new UserInfo();
        this.userSubject.next(this.user);
        return Observable.create((obs)=>{
                obs.next(true);
                obs.complete();
        })
    }
}

export const UserManager = new _UserManager();