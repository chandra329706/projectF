import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class SchoolFeeService{

    userDetails = {
        userid: 4,
        signature: '392c310f3e5a481f0ba4d077bdb2b6a3',
        WalletBalance: 0
    };
    getSelectedSchoolDataBody: any = {};
    baseUrl = 'http://www.developwebsite.in/demo/api/v1';
    headers = new Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' });
    reqHeaders = new RequestOptions({ headers: this.headers });

    constructor (private _http: Http){}

    //Get schools list
    getschoolsList(){
        return this._http.post(this.baseUrl+"/school/bank_list",this.userDetails,this.reqHeaders).map((res: Response)=>res.json());
    }

    getSelectedSchoolData(beneficiary_id){
        this.getSelectedSchoolDataBody = this.userDetails;
        this.getSelectedSchoolDataBody.beneficiary_id = beneficiary_id;
        return this._http.post(this.baseUrl+"/school/detail",this.getSelectedSchoolDataBody,this.reqHeaders).map((res: Response)=>res.json());         
    }

    //Get Purposes List
    getPurposesList(){
        return this._http.post(this.baseUrl+"/schoolpurpose/list",this.userDetails,this.reqHeaders).map((res: Response)=>res.json());
    }

    //Get Payment methods list
    getPaymentMetodsList(){
        return this._http.post(this.baseUrl+'/paymentmethod_list',this.userDetails,this.reqHeaders).map((res:Response)=>res.json());
    }

    //Get Payment Gateways List 
    getPaymentGatewaysList(){
        return this._http.post(this.baseUrl+'/paymentgateway_list',this.userDetails,this.reqHeaders).map((res:Response)=>res.json());
    }

    // Get Taxes List
    getTaxesList(){
        return this._http.post(this.baseUrl+'/tax_list',this.userDetails,this.reqHeaders).map((res:Response)=>res.json());
    }


}