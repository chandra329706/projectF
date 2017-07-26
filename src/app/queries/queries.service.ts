import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()

export class QueryService{
    constructor(private _http : Http){}

    baseUrl : string = 'http://api.flexypay.in/v1/';
    inputParams : any = {
        'userid':localStorage.getItem('currentUserId'),'signature':localStorage.getItem('currentUserToken')
    };

    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    submitUserQuery(data){
        this.inputParams.username = data.uname;
        this.inputParams.subject = data.query_subject;
        this.inputParams.message = data.query_description;
        return this._http.post(this.baseUrl+'query',this.inputParams, this.requestOptions).map(res => res.json());
    }
}