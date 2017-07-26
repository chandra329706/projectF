import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()

export class ProfileService{

    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    clientIp: any = 1;
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":this.userid, "signature":this.signature};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    constructor (private _http: Http){}

    sendProfileData(data){
        data.userid = this.userid;
        data.signature = this.signature;
        return this._http.post(this.baseUrl+'user/edit_profile',data,this.requestOptions).map(res=>res.json());
    }

    getProfileData(){
        return this._http.post(this.baseUrl+'user/detail', this.inputParams, this.requestOptions).map(res=>res.json());
    }

}