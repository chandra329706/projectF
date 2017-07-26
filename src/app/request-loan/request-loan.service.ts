import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()

export class RequestLoanService {

    constructor(private _http : Http){}

    inputParams : any = {'userid':localStorage.getItem('currentUserId'),'signature':localStorage.getItem('currentUserToken')};
    headers = new Headers({'Content-Type':'Application/json','Accept':'application/json'});
    requestOptions = new RequestOptions({'headers':this.headers});
    baseUrl :any = 'http://api.flexypay.in/v1/';

    sendLoanRequest(LoanData){
        this.inputParams.name = LoanData.user_name;
        this.inputParams.pan_card = LoanData.pan_card;
        this.inputParams.mail_id = LoanData.mail_id;
        this.inputParams.mobile_number = LoanData.phone_number;
        this.inputParams.address = LoanData.house_no;
        this.inputParams.locality = LoanData.locality;
        this.inputParams.area = LoanData.area;
        this.inputParams.city = LoanData.city;
        this.inputParams.pincode = LoanData.pinCode;
        this.inputParams.state = LoanData.state;
        this.inputParams.dob = LoanData.dob;
        this.inputParams.gender = LoanData.user_name;
        this.inputParams.occupation = LoanData.occupation;
        this.inputParams.edu_qualification = LoanData.education;
        this.inputParams.monthly_take_home_salary = LoanData.salary;
        this.inputParams.desired_loan_amount = LoanData.desired_loan;
        this.inputParams.tenure = LoanData.tenure;
        return this._http.post(this.baseUrl+'loan/create',this.inputParams, this.requestOptions).map(res=>res.json());
    }

    checkActiveMenus(){
        return this._http.post(this.baseUrl+'services',this.inputParams,this.requestOptions).map(res=>res.json());
    }
}
