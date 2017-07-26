import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class ViewBeneficiaryService{
    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    clientIp: any = 1;
    baseUrl: string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":this.userid, "signature":this.signature};
    // inputParams: any = {"userid":'4', "signature": '34d414650bd07893270700fa141281fa'};
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
        console.log(this.fetchBankAccountDetailsBody);
        console.log(this.fetchBankAccountDetailsBody);
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
        console.log("Form values are below");
        console.log(formValues);
        if(receivedDataType == 'bankAccountBeneficiary')
        return this._http.post(this.baseUrl+"beneficiary/edit_ben",formValues,this.requestOptions).map((res:Response)=>res.json());
        if(receivedDataType == 'houseRentBeneficiary')
        return this._http.post(this.baseUrl+"houserent/edit_house_rent",formValues,this.requestOptions).map((res:Response)=>res.json());
        if(receivedDataType == 'propertyMaintenanceBeneficiary')
        return this._http.post(this.baseUrl+"housemaintainence/edit_house_maintainence",formValues,this.requestOptions).map((res:Response)=>res.json());
        if(receivedDataType == 'schoolsBeneficiary')
        return this._http.post(this.baseUrl+"school/edit_school",formValues,this.requestOptions).map((res:Response)=>res.json());
        if(receivedDataType == 'collegeBeneficiary')
        return this._http.post(this.baseUrl+"college/edit_college",formValues,this.requestOptions).map((res:Response)=>res.json());
    }

    deleteRecord(data: any){
        data.userid = this.inputParams.userid;
        data.signature =  this.inputParams.signature;
        if(data.accountType == 'bankAccountBeneficiary') {data.beneficiary_id = data.id; return this._http.post(this.baseUrl+"beneficiary/delete",data,this.requestOptions).map((res:Response)=>res.json());}
        if(data.accountType == 'houseRentBeneficiary') {data.houserent_id = data.id; return this._http.post(this.baseUrl+"houserent/delete",data,this.requestOptions).map((res:Response)=>res.json());}
        if(data.accountType == 'propertyMaintenanceBeneficiary') {data.housemaintanance_id = data.id; return this._http.post(this.baseUrl+"housemaintanance/delete",data,this.requestOptions).map((res:Response)=>res.json());}
        if(data.accountType == 'schoolsBeneficiary') {data.school_id = data.id; return this._http.post(this.baseUrl+"school/delete",data,this.requestOptions).map((res:Response)=>res.json());}
        if(data.accountType == 'collegeBeneficiary') {data.college_id = data.id; return this._http.post(this.baseUrl+"college/delete",data,this.requestOptions).map((res:Response)=>res.json());}
    }

}