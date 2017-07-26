import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class PaymentService {

    constructor(private _http : Http){}

    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":this.userid, "signature":this.signature};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    getUserDeatils(UserId){
        return this._http.post(this.baseUrl+'user/detail',this.inputParams, this.requestOptions).map(res=>res.json())
    }

    getRequestpaymentDetails(Uid){
        this.inputParams.trans_id = Uid;
        return this._http.post(this.baseUrl+'requestpayment_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getLocation(){
        return this._http.get('http://ip-api.com/json').map(res=>res.json());
    }

}