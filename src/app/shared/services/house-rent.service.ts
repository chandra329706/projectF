import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class HouseRentService{

    userDetails = {
        userid: 4,
        signature: '392c310f3e5a481f0ba4d077bdb2b6a3',
        WalletBalance: 0
    };

    baseUrl = 'http://www.developwebsite.in/demo/api/v1';
    headers = new Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' });
    reqHeaders = new RequestOptions({ headers: this.headers });

    constructor(private _http: Http){}

    // Get Properties List
    getPropertiesList(){
        return this._http.post(this.baseUrl+"/housemaintanance/bank_list", this.userDetails, this.reqHeaders).map((res: Response)=>res.json());
    }

}