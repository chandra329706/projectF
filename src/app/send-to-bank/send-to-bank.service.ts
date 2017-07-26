import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class SendToBankService {
 
    constructor(private _http : Http){}
    clientIp = 1;
    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":this.userid, "signature":this.signature};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    getUsersList(){
         return this._http.post(this.baseUrl+'beneficiary/bank_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getUserPurposeList(){
        return this._http.post(this.baseUrl+'schoolpurpose/list', this.inputParams, this.requestOptions).map(res=>res.json());
    }

     getPaymentGatewayList(){
        return this._http.post(this.baseUrl+'paymentgateway_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getPaymentMethodList(){
        return this._http.post(this.baseUrl+'paymentmethod_list',  this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getTaxesList(){
        return this._http.post(this.baseUrl+'tax_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getBeneficiaryTotalDetails(SeelctedUserId){
        this.inputParams.beneficiary_id = SeelctedUserId;
        return this._http.post(this.baseUrl+'beneficiary/detail',this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getSettlementList(){
        return this._http.post(this.baseUrl+'settlement_type', this.inputParams, this.requestOptions).map(res=>res.json());
    }

     payFee(receivedData : any){
        receivedData.signature = this.signature;
        receivedData.userid = this.userid;
        receivedData.ip_address = this.clientIp;
        return this._http.post(this.baseUrl+'bank_basic/create', receivedData, this.requestOptions).map(res => res.json());
    }

    checkActiveMenus(){
        return this._http.post(this.baseUrl+'services',this.inputParams,this.requestOptions).map(res=>res.json());
    }

}