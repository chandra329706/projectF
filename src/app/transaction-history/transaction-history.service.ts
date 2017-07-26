import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class TransactionHistoryService {

    constructor(private _http : Http){}

    inputParams : any = {'userid':localStorage.getItem('currentUserId'),'signature':localStorage.getItem('currentUserToken')};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});
    baseUrl :any = 'http://api.flexypay.in/v1/';

    getAllTransactionsList(){
        return this._http.post(this.baseUrl+'transaction_history',this.inputParams,this.requestOptions).map(res=>res.json());
    }

    TransactionDetails(transaction_id){
        this.inputParams.transaction_id = transaction_id;
        return this._http.post(this.baseUrl+'beneficiary/transaction_list',this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getreceivedPaymnets(){
        return this._http.post(this.baseUrl+'paymentreceived',this.inputParams, this.requestOptions).map(res=>res.json());
    }

    download_transaction(transaction_id){
        this.inputParams.transaction_id = transaction_id;
        return this._http.post(this.baseUrl+'transaction_download',this.inputParams, this.requestOptions).map(res=>res);
    }
}