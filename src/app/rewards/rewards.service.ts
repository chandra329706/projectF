import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable()
export class RewardsService{

    constructor(private _http: Http){}

    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {'userid':localStorage.getItem('currentUserId'), 'signature':localStorage.getItem('currentUserToken')};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    getRewardsList(){
        return this._http.post(this.baseUrl+'redemption_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }
}