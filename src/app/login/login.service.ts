import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Jsonp} from '@angular/http';

@Injectable()

export class LoginService {

    constructor(private _http : Http, private _jsonp : Jsonp){}

    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});
    sendData: any = {};

    getloginIp(){
        return this._jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK').map(response => response.json());
    }

    makeUserLogin(userCredentials){
        this.inputParams.username = userCredentials.username;
        this.inputParams.password = userCredentials.password;
        this.inputParams.ip = userCredentials.ip;
        return this._http.post(this.baseUrl+'login', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    registration(data){
        return this._http.post(this.baseUrl+'register',data,this.requestOptions).map(res=>res.json());
    }

    FPFormSubmit(data){
        this.sendData.username = data;
        return this._http.post(this.baseUrl+'forgotpswd', this.sendData, this.requestOptions).map(res=>res.json());
    }


}

