import { Injectable, OnInit } from "@angular/core";
import {Observable} from "rxjs";
import {Http, Headers, Response} from "@angular/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/map";

@Injectable()

export class ApiService {
    private _baseUri: string = '';


    constructor(private _http:Http){ }
    
    loginService(){
        return this._http.get("https://jsonplaceholder.typicode.com/posts").map((res:Response)=> res.json());
    }
}