import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
// import {Observable} from 'rxjs/Rx';


@Injectable()

export class NavBarService {

    constructor(private _http : Http){}

    signature: any = localStorage.getItem('currentUserToken');
    userid : any = localStorage.getItem('currentUserId');
    baseUrl :string = 'http://api.flexypay.in/v1/';
    inputParams :any = {"userid":this.userid, "signature":this.signature};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});

    // checkValidLogin(){
    //     console.log('check');
    //     return this._http.post(this.baseUrl+'tax_list',this.inputParams, this.requestOptions).map(res=>{res.json();console.log(res);console.log('checked');})
    // }
}

//   Observable.interval(200 * 60).subscribe(x => {
//       checkValidLogin();
//   });