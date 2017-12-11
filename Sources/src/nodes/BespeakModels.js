/**
 * Created by zhuzihao on 2017/12/5.
 */


/***
 * 上传的model
 * */
export class NodeBespeakUpdateModel{
    name = "";
    phone = "";
    code = "";
    company="";
    position="";
    node = "";
    time = "";
    constructor(ops){
        this.name = ops.name;
        this.phone = ops.phone;
        this.code = ops.code;
        this.company = ops.company;
        this.position = ops.position;
        this.node = ops.node;
        this.time = ops.time;

    }
}

/**
 * 类型
 * */
export class BespeakType{
    static Content = 0; //文本输入
    static Time = 1;  //时间
    static Number = 2; //数组
    static Code = 3; //验证码
}
/***
 * 每一项
 * */
export class NodeBespeakItem{
    type = BespeakType.Content; //类型
    requird = false; //是否必须
    name = "" ;//名称
    icon = "";//图标
    placeContent = ""; //占位文字
    default = "";  //默认值
    canEdit = true; //是否可以编辑
    property = "";  //指向模型 属性名称
    constructor(ops){
        this.type = ops["type"];
        this.requird = ops["requird"];
        this.name = ops["name"];
        this.icon = ops["icon"];
        this.placeContent = ops["placeContent"];
        this.default = ops["default"];
        this.canEdit = ops["canEdit"];
        this.property = ops["property"];
    }
}
