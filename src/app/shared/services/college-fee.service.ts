import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class CollegeFeeService{

    userDetails = {
        userid: 4,
        signature: '54e9364f13e22b40ca83e0a044c335a9',
        WalletBalance: 0
    };
    getSelectedCollegeDataBody: any = {};
    baseUrl = 'http://www.developwebsite.in/demo/api/v1';
    headers = new Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' });
    reqHeaders = new RequestOptions({ headers: this.headers });

    constructor (private _http: Http){}

    //Get colleges list
    getcollegesList(){
        return this._http.post(this.baseUrl+"/college/bank_list",this.userDetails,this.reqHeaders).map((res: Response)=>res.json());
    }

    getSelectedCollegeData(beneficiary_id){
        this.getSelectedCollegeDataBody = this.userDetails;
        this.getSelectedCollegeDataBody.beneficiary_id = beneficiary_id;
        return this._http.post(this.baseUrl+"/college/detail",this.getSelectedCollegeDataBody,this.reqHeaders).map((res: Response)=>res.json());         
    }

    //Get Purposes List
    getPurposesList(){
        return this._http.post(this.baseUrl+"/collegepurpose/list",this.userDetails,this.reqHeaders).map((res: Response)=>res.json());
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