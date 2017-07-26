import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';



@Injectable()

export class SchoolFeeService {

    constructor(private _http : Http){}
    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    clientIp: any = 1;
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":localStorage.getItem('currentUserId'), "signature":localStorage.getItem('currentUserToken')};
    headers = new Headers();
    
    getSchoolsList(){
       this.headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'school/bank_list', this.inputParams, this.headers).map(res=>res.json());
    }

    getSchoolsPurposeList(){
        this.headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'schoolpurpose/list', this.inputParams, this.headers).map(res=>res.json());
    }

    getSchoolTotalDetails(selectedSchoolValue : any){
        let inputParams = {"userid":this.userid, "signature":this.signature,"beneficiary_id":selectedSchoolValue};
        this.headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'school/detail', inputParams, this.headers).map(res=>res.json());
    }

    getPaymentGatewayList(){
        this.headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'paymentgateway_list', this.inputParams, this.headers).map(res=>res.json());
    }

    getPaymentMethodList(){
        let inputParams = {"userid":this.userid, "signature":this.signature};
        let headers = new Headers();
        headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'paymentmethod_list', inputParams, headers).map(res=>res.json());
    }

    getTaxesList(){
        let inputParams = {"userid":this.userid, "signature":this.signature};
        let headers = new Headers();
        headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'tax_list', inputParams, headers).map(res=>res.json());
    }

    getSetlementTypes(){
        let inputParams = {"userid":this.userid, "signature":this.signature};
        let headers = new Headers();
        headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'settlement_type', inputParams, headers).map(res=>res.json());
    }

    payFee(receivedData){
        receivedData.signature = this.signature;
        receivedData.userid = this.userid;
        receivedData.ip_address = this.clientIp;
        let headers = new Headers();
        headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'school_basic/create', receivedData, headers).map(res => res.json());
   
    }

    checkActiveMenus(){
        let inputParams = {"userid":this.userid, "signature":this.signature};
        let headers = new Headers();
        headers.append('Content-Type:Application/json','Accept:application/json');
        return this._http.post(this.baseUrl+'services',inputParams,headers).map(res=>res.json());
    }


}