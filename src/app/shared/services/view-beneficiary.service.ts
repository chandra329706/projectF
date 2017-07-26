import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class ViewBeneficiaryService{
    // userDetails = {
    //     userid: 4,
    //     signature: '54e9364f13e22b40ca83e0a044c335a9'
    // }
    // baseUrl = 'http://www.developwebsite.in/demo/api/v1';
    // headers = new Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' });
    // reqHeaders = new RequestOptions({ headers: this.headers });
    

    userid: any = localStorage.getItem('currentUserId');
    signature: any = localStorage.getItem('currentUserToken');
    clientIp: any = 1;
    baseUrl: string = 'http://www.developwebsite.in/demo/api/v1/';
    inputParams: any = {"userid":localStorage.getItem('currentUserId'), "signature": localStorage.getItem('currentUserToken')};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers': this.headers});
    
    fetchBankAccountDetailsBody : any = {};

    constructor (private _http: Http){}

    // Bank Account Beneficiary
    viewBeneficiaryBankAccounts(){
        return this._http.post(this.baseUrl+"beneficiary/bank_list",this.inputParams,this.requestOptions).map((res:Response)=>res.json());
    }

    // House Rent Beneficiary
    viewBeneficiaryHouseRents(){
        return this._http.post(this.baseUrl+"houserent/bank_list",this.inputParams,this.requestOptions).map((res:Response)=>res.json());
    }

    // Maintenance Beneficiary
    viewBeneficiaryPropertyMaintenance(){
        return this._http.post(this.baseUrl+"housemaintanance/bank_list",this.inputParams,this.requestOptions).map((res:Response)=>res.json());
    }

    // School Beneficiary
    viewBeneficiarySchools(){
        return this._http.post(this.baseUrl+"school/bank_list",this.inputParams,this.requestOptions).map((res:Response)=>res.json());
    }

    // College Beneficiary
    viewBeneficiaryColleges(){
        return this._http.post(this.baseUrl+"college/bank_list",this.inputParams,this.requestOptions).map((res:Response)=>res.json());
    }

    // View Bank Account Details
    viewBankAccountDetails(id:any, accountType: any){
        this.fetchBankAccountDetailsBody.userid = this.inputParams.userid;
        this.fetchBankAccountDetailsBody.signature =  this.inputParams.signature;
        this.fetchBankAccountDetailsBody.beneficiary_id = id;
        if(accountType == 'bankAccountBeneficiary') return this._http.post(this.baseUrl+"beneficiary/detail",this.fetchBankAccountDetailsBody,this.requestOptions).map((res:Response)=>res.json());
        if(accountType == 'houseRentBeneficiary') return this._http.post(this.baseUrl+"houserent/detail",this.fetchBankAccountDetailsBody,this.requestOptions).map((res:Response)=>res.json());
        if(accountType == 'propertyMaintenanceBeneficiary') return this._http.post(this.baseUrl+"housemaintenance/detail",this.fetchBankAccountDetailsBody,this.requestOptions).map((res:Response)=>res.json());
        if(accountType == 'schoolsBeneficiary') return this._http.post(this.baseUrl+"school/detail",this.fetchBankAccountDetailsBody,this.requestOptions).map((res:Response)=>res.json());
        if(accountType == 'collegeBeneficiary') return this._http.post(this.baseUrl+"college/detail",this.fetchBankAccountDetailsBody,this.requestOptions).map((res:Response)=>res.json());
    }

    // Save and Exit Bank Details
    saveAndExitBankAccountDetails(formValues : any, receivedDataType: any){
        formValues.userid = this.inputParams.userid;
        formValues.signature = this.inputParams.signature;
        if(receivedDataType == 'bankAccountBeneficiary')
        return this._http.post(this.baseUrl+"beneficiary/edit_ben",formValues,this.requestOptions).map((res:Response)=>res.json());
    }
}