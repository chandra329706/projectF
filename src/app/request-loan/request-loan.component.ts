import { Component, OnInit } from '@angular/core';
import {RequestLoanService} from './request-loan.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.css'],
  providers : [RequestLoanService]
})
export class RequestLoanComponent implements OnInit {

  constructor(private _requestLoanService: RequestLoanService) { }

  StoreLoanRequestRes :any = [];
  UserStatus: any;
  ActiveMenusData :any = [];
  IsMenuActive : any;
  Disabled : boolean = false;

  ngOnInit() {
    this.UserStatus = localStorage.getItem('UserStatus');
    this._requestLoanService.checkActiveMenus().subscribe(MData => {
      this.ActiveMenusData = MData;
      this.IsMenuActive = 0;   
      this.UserStatus = this.ActiveMenusData.user_status;
      if(this.UserStatus == 1 || this.UserStatus == 6){
        this.Disabled = true;
      }     
      this.ActiveMenusData.data.forEach(Menu => {        
        if(Menu.service_id == 7){
          this.IsMenuActive = 1;
        }
      });
    });
  }

  SendLoanRequest(LoanRequest : NgForm){
    this._requestLoanService.sendLoanRequest(LoanRequest.value).subscribe(lrData => {
      this.StoreLoanRequestRes = lrData;
      if(this.StoreLoanRequestRes.status == 1){
          LoanRequest.reset();
          this.Disabled = false;
      }      
    });
  }

}
