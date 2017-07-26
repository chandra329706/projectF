import { Component, OnInit } from '@angular/core';
import { ViewBeneficiaryService } from './view-beneficiary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-beneficiary',
  templateUrl: './view-beneficiary.component.html',
  styleUrls: ['./view-beneficiary.component.css'],
  providers: [ViewBeneficiaryService]
})
export class ViewBeneficiaryComponent implements OnInit {

  beneficiaryBankAccounts: any = [];
  beneficiaryHouseRent: any = [];
  beneficiaryPropertyMaintenance: any = [];
  beneficiarySchools: any =  [];
  beneficiaryColleges: any = [];
  disableInput: any = true;
  bankAccountDetails: any = {};
  editBankDetailsFormSubmissionMsg : any = {};
  performDelete: any = {};
  deleteRecordResult: any = {};
  message : any = '';

  constructor(private _ViewBeneficiaryService: ViewBeneficiaryService, private router: Router) { }

  ngOnInit() {}

  // Bank Account Beneficiary
  viewBeneficiaryBankAccounts(){this.message = ''; this._ViewBeneficiaryService.viewBeneficiaryBankAccounts().subscribe(res => {this.beneficiaryBankAccounts = res; if (this.beneficiaryBankAccounts.status == 0) this.message = "No data found"});}

  // House Rent Beneficiary
  viewBeneficiaryHouseRent(){this.message = ''; this._ViewBeneficiaryService.viewBeneficiaryHouseRents().subscribe(res => {this.beneficiaryHouseRent = res; if(this.beneficiaryHouseRent.status==0) this.message = "No data found"})}

  // Maintenance Beneficiary
  viewBeneficiaryPropertyMaintenance(){this.message = ''; this._ViewBeneficiaryService.viewBeneficiaryPropertyMaintenance().subscribe(res => {this.beneficiaryPropertyMaintenance = res; if(this.beneficiaryPropertyMaintenance.status==0) this.message = "No data found"})}

  // School Beneficiary
  viewBeneficiarySchools(){this.message = ''; this._ViewBeneficiaryService.viewBeneficiarySchools().subscribe(res => {this.beneficiarySchools = res; if(this.beneficiarySchools.status==0) this.message = 'No data found'})}

  // College Beneficiary
  viewBeneficiaryColleges(){this.message = ''; this._ViewBeneficiaryService.viewBeneficiaryColleges().subscribe(res => {this.beneficiaryColleges = res; if(this.beneficiaryColleges.status == 0) this.message = "No data found"})}

  showViewModel(id : any, accountType: any){
    console.log(id + accountType);
    this.disableInput = true;
    this._ViewBeneficiaryService.viewBankAccountDetails(id,accountType).subscribe(res => {this.bankAccountDetails = res;this.bankAccountDetails.receivedDataType=accountType;console.log("Comes here");console.log(this.bankAccountDetails)});
  }

  confirmDelete(id: any, accountType: any){
    this.performDelete.id = id;
    this.performDelete.accountType = accountType;
  }

  deleteRecord(id: any, accountType: any){
    var recordData:any = {id: id, accountType: accountType}
    this._ViewBeneficiaryService.deleteRecord(recordData).subscribe(res=>{this.deleteRecordResult=res;console.log(this.deleteRecordResult);
                                                                          if(recordData.accountType=="bankAccountBeneficiary") this.viewBeneficiaryBankAccounts();
                                                                          if(recordData.accountType=="houseRentBeneficiary") this.viewBeneficiaryHouseRent();
                                                                          if(recordData.accountType=="propertyMaintenanceBeneficiary") this.viewBeneficiaryPropertyMaintenance();
                                                                          if(recordData.accountType=="schoolsBeneficiary") this.viewBeneficiarySchools();
                                                                          if(recordData.accountType=="collegeBeneficiary") this.viewBeneficiaryColleges();
                                                                        })
  }
  
  showEditModel(){this.disableInput = false;}

  //Save and Exit Functionality
  editBankDetailsForm(receivedDataType: any){
    if(receivedDataType == 'bankAccountBeneficiary') this.bankAccountDetails.beneficiary_id = this.bankAccountDetails.id;
    if(receivedDataType == 'houseRentBeneficiary') this.bankAccountDetails.house_rent_id = this.bankAccountDetails.id;
    if(receivedDataType == 'propertyMaintenanceBeneficiary') this.bankAccountDetails.maintainence_id = this.bankAccountDetails.id;
    if(receivedDataType == 'schoolsBeneficiary') this.bankAccountDetails.school_id = this.bankAccountDetails.id;
    if(receivedDataType == 'collegeBeneficiary') this.bankAccountDetails.college_id = this.bankAccountDetails.id;

    this._ViewBeneficiaryService.saveAndExitBankAccountDetails(this.bankAccountDetails,receivedDataType).subscribe(res => {this.editBankDetailsFormSubmissionMsg = res; console.log(this.editBankDetailsFormSubmissionMsg);});
    
    if(receivedDataType == 'bankAccountBeneficiary')this.viewBeneficiaryBankAccounts();
    if(receivedDataType == 'houseRentBeneficiary')this.viewBeneficiaryHouseRent();
    if(receivedDataType == 'propertyMaintenanceBeneficiary')this.viewBeneficiaryPropertyMaintenance();
    if(receivedDataType == 'schoolsBeneficiary')this.viewBeneficiarySchools();
    if(receivedDataType == 'collegeBeneficiary')this.viewBeneficiaryColleges();
  }

  //Save and Pay Functionality
  saveAndPay(receivedDataType: any){
    if(receivedDataType == 'bankAccountBeneficiary') this.bankAccountDetails.beneficiary_id = this.bankAccountDetails.id;
    if(receivedDataType == 'houseRentBeneficiary') this.bankAccountDetails.house_rent_id = this.bankAccountDetails.id;
    if(receivedDataType == 'propertyMaintenanceBeneficiary') this.bankAccountDetails.maintainence_id = this.bankAccountDetails.id;
    if(receivedDataType == 'schoolsBeneficiary') this.bankAccountDetails.school_id = this.bankAccountDetails.id;
    if(receivedDataType == 'collegeBeneficiary') this.bankAccountDetails.college_id = this.bankAccountDetails.id;

    this._ViewBeneficiaryService.saveAndExitBankAccountDetails(this.bankAccountDetails,receivedDataType).subscribe(res => {this.editBankDetailsFormSubmissionMsg = res; console.log(this.editBankDetailsFormSubmissionMsg);
    this.router.navigateByUrl('/'+this.editBankDetailsFormSubmissionMsg.record_type+'/'+this.editBankDetailsFormSubmissionMsg.id);
  });


  }

  navigator(id){
    console.log("the id to be passed is " + id);
    this.router.navigateByUrl('/houserent');
  }


}
