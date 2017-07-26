import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()

export class AddBeneficiaryService{

    constructor (private _http : Http){}

    signature: any = localStorage.getItem('currentUserToken');
    userid: any = localStorage.getItem('currentUserId');
    clientIp: any = 1;
    baseUrl: string = 'http://api.flexypay.in/v1/';
    inputParams: any = {"userid":localStorage.getItem('currentUserId'), "signature": localStorage.getItem('currentUserToken')};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers': this.headers});

    addBankAccounts(data){
        data.userid = this.userid;
        data.signature = this.signature;
        return this._http.post(this.baseUrl+'beneficiary/create',data,this.requestOptions).map(res=>res.json());
    }

    addHouseRentProperties(data){
        data.userid = this.userid;
        data.signature = this.signature;
        return this._http.post(this.baseUrl+'houserent/create',data,this.requestOptions).map(res=>res.json());
    }
        
    addMonthlyMaintenanceProperties(data){
        data.userid = this.userid;
        data.signature = this.signature;
        return this._http.post(this.baseUrl+'housemaintanance/create',data,this.requestOptions).map(res=>res.json());        
    }

    addSchools(data){
        data.userid = this.userid;
        data.signature = this.signature;
        return this._http.post(this.baseUrl+'school/create',data,this.requestOptions).map(res=>res.json());
    }

    addColleges(data){
        data.userid = this.userid;
        data.signature = this.signature;
        return this._http.post(this.baseUrl+'college/create',data,this.requestOptions).map(res=>res.json());
    }

    checkUserStatus(){
        return this._http.post(this.baseUrl+'user/status',this.inputParams,this.requestOptions).map(res=>res.json());
    }

}