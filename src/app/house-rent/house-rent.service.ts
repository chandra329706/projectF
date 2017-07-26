import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()

export class HouseRentService{
    constructor (private _http: Http){}
    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    clientIp: any = 1;
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":localStorage.getItem('currentUserId'), "signature":localStorage.getItem('currentUserToken')};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    getPropertiesList(){
        return this._http.post(this.baseUrl+'houserent/bank_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }
    
    getPaymentMethodList(){
        return this._http.post(this.baseUrl+'paymentmethod_list',  this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getPaymentGatewayList(){
        return this._http.post(this.baseUrl+'paymentgateway_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getSettlementList(){
        return this._http.post(this.baseUrl+'settlement_type', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getTaxesList(){
        return this._http.post(this.baseUrl+'tax_list', this.inputParams, this.requestOptions).map(res=>res.json());
    }

    getPropertyDetails(propId : any){    
        this.inputParams.beneficiary_id = propId;
        return this._http.post(this.baseUrl+'houserent/detail',this.inputParams, this.requestOptions).map(res=>res.json());
    }

    payFee(receivedData : any){
        receivedData.signature = this.signature;
        receivedData.userid = this.userid;
        receivedData.ip_address = this.clientIp;
        return this._http.post(this.baseUrl+'rent_basic/create', receivedData, this.requestOptions).map(res => res.json());
    }

    checkActiveMenus(){
        return this._http.post(this.baseUrl+'services',this.inputParams,this.requestOptions).map(res=>res.json());
    }
    
}