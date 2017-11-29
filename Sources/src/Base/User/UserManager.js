/**
 * Created by zhuzihao on 2017/11/28.
 */
import { Subject } from "rxjs/Rx"

export class  UserInfo{
    Authorization = null;
}
class _UserManager {
    user = null;
    userSubject = new Subject();
    constructor(){}
}

export const UserManager = new _UserManager();