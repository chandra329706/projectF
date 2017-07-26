import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class RequestPaymentService {
 
    constructor(private _http : Http){}

    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":this.userid, "signature":this.signature};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    submitRequestPaymnent(formValues){
        formValues.userid = this.inputParams.userid;
        formValues.signature = this.inputParams.signature;        
        return this._http.post(this.baseUrl+'requestpayment_create',formValues, this.requestOptions).map(res=>res.json());
    }

    checkActiveMenus(){
        return this._http.post(this.baseUrl+'services',this.inputParams,this.requestOptions).map(res=>res.json());
    }

    
}