import { Component, OnInit } from '@angular/core';
import { AddBeneficiaryService } from "./add-beneficiary.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css'],
  providers: [AddBeneficiaryService]
})
export class AddBeneficiaryComponent{

  addBankAccount: any = {};
  addBankAccountResult: any = {};
  addHouseRentProperty: any = {'property_type':'','reminder_day':'','state':''};
  addHouseRentPropertyResult: any;
  monthlyMaintenanceProperty: any = {'property_type':'','reminder_day':'','state':''};
  monthlyMaintenancePropertyResult: any = {};
  addSchool: any = {'state':''};
  addSchoolResult: any ={};
  addCollege: any = {'state':''};
  addCollegeResult: any = {};
  dates: any;
  TnC: boolean = false;
  operationResult: any = {};
  UserStatus : any;
  StatesList :any = [];
 


  constructor(private _AddBeneficiaryService : AddBeneficiaryService, private router: Router) {}

  ngOnInit() {
    this.operationResult.message='';
    this.UserStatus = localStorage.getItem('UserStatus');
    this.dates=[];
    for(var i=1;i<32;i++) this.dates.push(i);
    this._AddBeneficiaryService.checkUserStatus().subscribe(data=>{
      this.UserStatus=data.user_status;
      // console.log('User Status >>'+this.UserStatus)
    });
    this._AddBeneficiaryService.getStates().subscribe(sdata=>{
      if(sdata.status==1){
        this.StatesList = sdata;
      }
      
    });
  }

  addBankAccounts(){
    this._AddBeneficiaryService.addBankAccounts(this.addBankAccount).subscribe(res=>{this.addBankAccountResult = this.operationResult = res; console.log(this.addBankAccountResult) });
  }

  addBankAccountsAndPay(){
    this._AddBeneficiaryService.addBankAccounts(this.addBankAccount).subscribe(res=>{
      this.addBankAccountResult =  res;
      this.router.navigate(['/sendtobank/'+this.addBankAccountResult.id]);
    });
  }

  addHouseRentProperties(){
    this._AddBeneficiaryService.addHouseRentProperties(this.addHouseRentProperty).subscribe(res=>{this.addHouseRentPropertyResult = this.operationResult = res;console.log(this.addBankAccountResult); this.TnC=false});
  }

  addHouseRentPropertiesAndPay(){
    this._AddBeneficiaryService.addHouseRentProperties(this.addHouseRentProperty).subscribe(res=>{
      this.addHouseRentPropertyResult = res;
      this.router.navigate(['/houserent/'+this.addHouseRentPropertyResult.id])
    });
  }

  addMonthlyMaintenanceProperties(){
    this._AddBeneficiaryService.addMonthlyMaintenanceProperties(this.monthlyMaintenanceProperty).subscribe(res=>{this.monthlyMaintenancePropertyResult = this.operationResult = res; console.log(this.monthlyMaintenancePropertyResult)});
  }

  addMonthlyMaintenancePropertiesAndPay(){
    this._AddBeneficiaryService.addMonthlyMaintenanceProperties(this.monthlyMaintenanceProperty).subscribe(res=>{
      this.monthlyMaintenancePropertyResult = res;
      this.router.navigate(['/maintenance/'+this.monthlyMaintenancePropertyResult.id]);
    });
  }

  addSchools(){
    this._AddBeneficiaryService.addSchools(this.addSchool).subscribe(res=>{this.addSchoolResult=this.operationResult=res;console.log(this.addSchoolResult)});
  }

  addSchoolsAndPay(){
    this._AddBeneficiaryService.addSchools(this.addSchool).subscribe(res=>{
      this.addSchoolResult = res;
      this.router.navigate(['/schoolfee/'+this.addSchoolResult.id]);
    });

  }

  addColleges(){
    this._AddBeneficiaryService.addColleges(this.addCollege).subscribe(res=>{this.addCollegeResult=this.operationResult=res;console.log(this.addCollegeResult)});    
  }

  addCollegesAndPay(){
    this._AddBeneficiaryService.addColleges(this.addCollege).subscribe(res=>{
      this.addCollegeResult = res;
      this.router.navigate(['/collegefee/'+this.addCollegeResult.id]);
    }); 
  }

  redirectMakepayment(){
    this.router.navigate(['makepayments']);
  }

}
