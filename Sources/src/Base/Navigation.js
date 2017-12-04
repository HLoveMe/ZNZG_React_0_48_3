/**
 * Created by zhuzihao on 2017/11/30.
 */


import { StackNavigator,NavigationActions } from "react-navigation";
import {LoginConfig,ProfileName,UserLoginView} from "./login/UserLoginView";
import { UserManager } from "../Base/User/UserManager";

class _NavigationManager {
    navigations = [];
    addNavigation(Navigation){
        this.navigations.push(Navigation);
    }
}
const NavigationManager = new _NavigationManager();

class _Navigation {
    navi = null;
    constructor(navi) {
        this.navi = navi;
        //检查 权限
        const defaultetgetComponentForRouteName = navi.router.getComponentForRouteName;
        navi.router.getComponentForRouteName = (name)=>{
            if(name == ProfileName ){//需要权限?
                let defaultV = defaultetgetComponentForRouteName(name);
                //需要登入
                let _UserLoginView = (ops)=>{
                    let Login =  new defaultV(ops);
                    return Login;
                };
                return  _UserLoginView;
            }
            return  defaultetgetComponentForRouteName(name);
        };

        const  defaultGetStateForAction = navi.router.getStateForAction;
        navi.router.getStateForAction = (action,state)=>{
            let next = defaultGetStateForAction(action,state);
            if(action.type == NavigationActions.BACK){
                //判断是否为登入界面
                //要回退的界面
                let {index,routes} = next;
                let pre = routes[index];
                if (pre.routeName == ProfileName){
                    debugger
                    //为登入界面
                    let _pre = routes[index-1];
                    action["key"] = _pre.key;
                    routes.pop();
                    //再次回退
                    return defaultGetStateForAction(action,routes);
                }
            }else if(action.type == NavigationActions.NAVIGATE){
                let {index,routes} = next;
                let View = defaultetgetComponentForRouteName(routes[index].routeName);
                if(View.power){//需要权限
                    if(!UserManager.isLogin){
                        //还没登
                        let target = routes[index].routeName;
                        routes[index].params["login_target"] = target;
                        routes[index].routeName = ProfileName;
                        routes[index].params["router"] = next;
                        return next;
                    }
                }
            }
            console.log(next);
            return next;
        };
    }
}

export const Navigationer = (RouteConfigs,StackNavigatorConfig)=>{
    let navi = StackNavigator({...RouteConfigs,...LoginConfig},StackNavigatorConfig);
    let navigation = new _Navigation(navi);
    NavigationManager.addNavigation(navigation);
    return navi;
};