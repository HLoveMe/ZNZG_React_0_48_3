/**
 * Created by zhuzihao on 2017/11/28.
 */


export class HttpMethod{
    static GET = "GET";
    static POST = "POST";
}
export class HttpRequestOption{
    url = "";
    method =  HttpMethod.GET;
    body = null;
    headers = null;
    constructor(url,method,body,header) {
        this.url = url;
        this.method = method || HttpMethod.GET;
        this.body = body || {};
        this.headers = header || {};
    }

}