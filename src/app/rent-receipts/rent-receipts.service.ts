import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class RentReceiptService {

    constructor(private _http : Http){}

    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":this.userid, "signature":this.signature};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

   storeRecepitValues(receiptValues){
    //    console.log(receiptValues);
    //    return this._http.post(this.baseUrl+'rent_receipt_create', this.inputParams, this.requestOptions).map(res=>res.json());
   }

   getUserStatus(){
    return this._http.post(this.baseUrl+'user/status',this.inputParams,this.requestOptions).map(res=>res.json());
   }

}
