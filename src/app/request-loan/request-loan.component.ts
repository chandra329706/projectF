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
  dateData: any = {};
  StatesList : any = [];

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
    this._requestLoanService.getStates().subscribe(sdata=>{
      if(sdata.status==1){
        this.StatesList = sdata;
      }
      
    });
    // Date Module Start
    this.dateData.year='';
    this.dateData.month='';
    this.dateData.day='';
    this.dateData.getYears=[{'name':'Year','value':''}];
    this.dateData.getDays=[{'name':'Day','value':''}];
    this.dateData.getMonths=[{'name':'Month','value': ''},
    {'name':'Jan', 'value': '1'},
    {'name':'Feb', 'value': '2'},
    {'name':'Mar', 'value': '3'},
    {'name':'Apr', 'value': '4'},
    {'name':'May', 'value': '5'},
    {'name':'Jun', 'value': '6'},
    {'name':'Jul', 'value': '7'},
    {'name':'Aug', 'value': '8'},
    {'name':'Sep', 'value': '9'},
    {'name':'Oct', 'value': '10'},
    {'name':'Nov', 'value': '11'},
    {'name':'Dec', 'value': '12'},
    ];
    this.getYears();
    // Date Module End
  }

  // Date Functions Start
  getYears(){
  for (var temp=2000; temp<=2020; temp++) this.dateData.getYears.push({'name':temp,'value':temp});
  }
  getMonths(){
  if(this.dateData.month!='') this.getDays();
  }
  getDays(){
  this.dateData.getDays=[];
  var daysPerMonth=0;
  if(this.dateData.month=='Jan'||this.dateData.month=='Mar'||this.dateData.month=='May'||this.dateData.month=='Jul'||this.dateData.month=='Aug'||this.dateData.month=='Oct'||this.dateData.month=='Dec') {daysPerMonth = 31;}
  else if(this.dateData.month=='Feb')
  if(this.dateData.year%4 == 0) daysPerMonth = 29;
  else daysPerMonth = 28;
  else daysPerMonth = 30;
  // console.log('Year is'+this.dateData.year+', Month is '+this.dateData.month+', No of days is '+daysPerMonth);
  for(var temp=1; temp<=daysPerMonth; temp++) this.dateData.getDays.push({'name':temp,'value':temp});
  }
  createDate(){
    // this.mainData.date = this.dateData.year+this.dateData.month+this.dateData.day;
  }
  // Date Functions End

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
