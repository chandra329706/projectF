import { Component, OnInit, ViewChild } from '@angular/core';
import {SchoolFeeService} from './School-fee.service';
import {Router, ActivatedRoute} from "@angular/router";
import {PaymentComponentComponent} from '../payment-component/payment-component.component';


@Component({
  selector: 'app-school-fee',
  templateUrl: './school-fee.component.html',
  styleUrls: ['./school-fee.component.css'],
  providers : [SchoolFeeService]
})

export class SchoolFeeComponent implements OnInit {
  @ViewChild('paymentFormComponent') paymentComponent : PaymentComponentComponent;
  
  
  selectedPurpose :any;
  SchoolsListData : any = [];
  DisablePay : any;
  SchoolsPurposeListData : any = [];
  otherPurpose: any = '';
  selectedSchool :any;
  totalSchoolDetails : any;
  PaymentGatewayList :any = [];
  PaymentMethodList : any =[];
  payMethod : any;
  remarks : any = "";
  schoolName : any = '-';
  NameAsperBank : any = '-';
  Ifsc : any = '-';
  accountNumber : any = '-';
  Amount : any = 0;
  WalletBalance : any = '0.00';
  Class : any = '-';
  State : any = '-';
  Section : any = '-';
  StudentName : any = '-';
  RollNo : any = '-';
  TaxesList : any = [];
  UpdatedTaxesList : any = [];
  ConvenienceFeeAmount : any = 0;
  ConvenienceFeePercent : any = 0;
  TotalAmount : any = 0;
  paymentMethod :any = '-';
  TaxTotal :any = "0";
  PaymentOrderID : any;
  SettlementTypes : any =[];
  SelectedSettlementAmountType :any;
  SelectedSettlementAmountID :any = 1;
  SelectedSettlementAmountValue :any = 0;
  useWalletAmount :boolean = false;
  walletBalance: Number = 0;
  wallet : any = {"percentage": "10","minusAmount": "0"};
  walletAmountUsed: number = 0;
  toSendData: any = {};
  discountAmount: any = 0;
  coupon: any = '';
  SelectedPaymentGateway : any = 3;
  SchoolPayFeeResponse : any = {};
  BeneficiaryDetails : any;
  SchId : any;
  UserStatus : any;
  ActiveMenusData: any =[];
  IsMenuActive : any;
  DisableUserPay : boolean = false;

  constructor(private _schoolfeeservice : SchoolFeeService, private route:ActivatedRoute) {
   }

  ngOnInit() {
    //console.log(localStorage.getItem('currentUserToken'));
    
    this.DisablePay = false;
    this.UserStatus = localStorage.getItem('UserStatus');
    this.selectedPurpose = "";
    this.selectedSchool = '';
      this.route.params.subscribe(params => {
          this.SchId = +params['id'];
      });
      this.selectedSchool = this.SchId;
      this._schoolfeeservice.checkActiveMenus().subscribe(MData => {
      this.ActiveMenusData = MData; 
      console.log(this.ActiveMenusData);
         
      this.IsMenuActive = 0;   
      this.UserStatus = this.ActiveMenusData.user_status;
      if(this.UserStatus == 1 || this.UserStatus == 6){
        this.DisableUserPay = true;
      }  
      this.ActiveMenusData.data.forEach(Menu => {     
        if(Menu.service_id == 2){
          this.IsMenuActive = 1;
        }
      });
    });
    this.walletBalance = Number(localStorage.getItem('currentWalletBalance'));
    this._schoolfeeservice.getSchoolsList().subscribe(sData => {
      this.SchoolsListData = sData;
    });
    this._schoolfeeservice.getSchoolsPurposeList().subscribe(spData => {
      this.SchoolsPurposeListData = spData;
    });
    this._schoolfeeservice.getPaymentGatewayList().subscribe(pgData => { this.PaymentGatewayList = pgData; this.checkPaymentGateway(this.PaymentGatewayList.data[0].id);});
    this._schoolfeeservice.getPaymentMethodList().subscribe(pmData =>{
      this.PaymentMethodList = pmData;
      if(this.PaymentMethodList.status == 1){
        this.PaymentMethodList.data.forEach(payMethod => {
              if(payMethod.id==5){
                this.ConvenienceFeePercent = payMethod.field_value;
                this.paymentMethod = payMethod.field_name;
              }
          });
      }
    });
    this._schoolfeeservice.getTaxesList().subscribe(tData => {
      this.TaxesList = tData;
      if(this.TaxesList.status == 1){
          this.TaxesList.data.forEach(tax => {
              tax.tax_value = 0;
              this.UpdatedTaxesList.push(tax);
          });
      }            
    });
    this._schoolfeeservice.getSetlementTypes().subscribe(Sdata => {
      this.SettlementTypes = Sdata;
      if(this.SettlementTypes.status == 1){
        
        
        this.SettlementTypes.data.forEach(settlementType => {

              if(settlementType.id==this.SelectedSettlementAmountID){
                this.SelectedSettlementAmountType = settlementType.amount_type;
                this.SelectedSettlementAmountID = settlementType.id;
                this.SelectedSettlementAmountValue = settlementType.value;
              }          
          });
      }
    });
    if(this.SchId){
     this._schoolfeeservice.getSchoolTotalDetails(this.SchId).subscribe(schoolDetails =>{
      this.totalSchoolDetails = schoolDetails;
      this.schoolName = this.totalSchoolDetails.school_name;
      this.accountNumber = this.totalSchoolDetails.bank_account_number;
      this.NameAsperBank = this.totalSchoolDetails.bank_account_name;
      this.Ifsc = this.totalSchoolDetails.ifsc;
      this.StudentName = this.totalSchoolDetails.student_name;
      this.Class = this.totalSchoolDetails.class;
      this.State = this.totalSchoolDetails.state;
      this.RollNo = this.totalSchoolDetails.roll_number;
      this.Section = this.totalSchoolDetails.section;
    });
    }
  }

  getBSchoolDetails(){
    this._schoolfeeservice.getSchoolTotalDetails(this.selectedSchool).subscribe(schoolDetails =>{
      this.totalSchoolDetails = schoolDetails;
      this.schoolName = this.totalSchoolDetails.school_name;
      this.accountNumber = this.totalSchoolDetails.bank_account_number;
      this.NameAsperBank = this.totalSchoolDetails.bank_account_name;
      this.Ifsc = this.totalSchoolDetails.ifsc;
      this.StudentName = this.totalSchoolDetails.student_name;
      this.Class = this.totalSchoolDetails.class;
      this.State = this.totalSchoolDetails.state;
      this.RollNo = this.totalSchoolDetails.roll_number;
      this.Section = this.totalSchoolDetails.section;
    });
  }

  checkPaymethod(payMethodObj : any, settlementTypeObj : any){
    this.TaxTotal = 0;
    if(payMethodObj!=0){
      this.paymentTypeCFcal(payMethodObj);
    }

    if(settlementTypeObj!=0){
        this.CalSettlementTypeAmount(settlementTypeObj);
    }

    this.ConvenienceFeeAmount = ((this.Amount/100)*this.ConvenienceFeePercent);
    if(this.SelectedSettlementAmountType == 1){
      this.ConvenienceFeeAmount += parseInt(this.SelectedSettlementAmountValue);
    }else{
      this.ConvenienceFeeAmount += ((this.Amount/100)*this.SelectedSettlementAmountValue);
    }

    if(this.useWalletAmount == true){
      this.walletBalance = Number(localStorage.getItem('currentWalletBalance'));
      if((this.ConvenienceFeeAmount*this.wallet.percentage/100) <= this.walletBalance)
      {
        this.walletAmountUsed = this.ConvenienceFeeAmount*this.wallet.percentage/100;
        this.ConvenienceFeeAmount = this.ConvenienceFeeAmount-(this.walletAmountUsed);
        this.walletBalance = Number(this.walletBalance) - this.walletAmountUsed;
        console.log("came into the wallet ");
      }
      else 
      {
        this.ConvenienceFeeAmount = this.ConvenienceFeeAmount-Number(this.walletBalance);
      }
    }else{
      this.walletAmountUsed = 0;
    }

    this.UpdatedTaxesList.forEach(tax => {
      if(tax.tax_type==2){     // tax_type = 2 --> calculate Percentage
           tax.tax_value = (this.ConvenienceFeeAmount/100)*tax.tax_amount;
      }else{   // tax_type = 1 --> fixed amount
          tax.tax_value = tax.tax_amount;
      }   
      this.TaxTotal = parseFloat(tax.tax_value)+parseFloat(this.TaxTotal);
    });
    this.TotalAmount = parseFloat(this.ConvenienceFeeAmount)+parseFloat(this.Amount)+parseFloat(this.TaxTotal);
  }

  SubmitPaymentDetailss(){
    this.DisablePay = true;
    let taxes = JSON.stringify(this.UpdatedTaxesList);
    this.toSendData.school_id = this.selectedSchool;
    this.toSendData.purpose = this.selectedPurpose;
    this.toSendData.amount = this.Amount;
    this.toSendData.mode_of_payment = this.paymentMethod;
    this.toSendData.settlement_type = this.SelectedSettlementAmountID;
    this.toSendData.payment_gateway = this.SelectedPaymentGateway;
    this.toSendData.bank_account_holder = this.NameAsperBank;
    this.toSendData.bank_account_number = this.accountNumber;
    this.toSendData.bank_name = this.totalSchoolDetails.bank_name;
    this.toSendData.ifsc_code = this.Ifsc;
    this.toSendData.wallet_amount = this.walletBalance;
    this.toSendData.discount_amount = this.discountAmount;
    this.toSendData.convenience_fee = this.ConvenienceFeeAmount;
    this.toSendData.final_amount = this.TotalAmount;
    this.toSendData.coupon_id = this.coupon;
    this.toSendData.taxis = taxes;
    this.toSendData.remarks = (this.remarks=='')?"School Fee Payment":this.remarks;
    this._schoolfeeservice.payFee(this.toSendData).subscribe(res => {
      this.SchoolPayFeeResponse = res;
      if(this.SchoolPayFeeResponse.status == 1){
        var PaymetFormDetails = {'TotalAmount':Math.round(this.TotalAmount),
                                  'Remarks':(this.remarks=='')?"School Fee Payment":this.remarks,
                                  'OrderID':this.SchoolPayFeeResponse.transaction_code,
                                  'TransactionId':this.SchoolPayFeeResponse.transaction_id,
                                  'PaymentMethod':this.paymentMethod,
                                  'PaymentFor': 'School',
                                  'UId':localStorage.getItem('currentUserId'),'Signature':localStorage.getItem('currentUserToken')
                                };
        this.paymentComponent.SubmitPaymentDetails(PaymetFormDetails);
      }
    });
  }

  checkPaymentGateway(paymentGatewayID){
    this.SelectedPaymentGateway = paymentGatewayID;
    
  }

  paymentTypeCFcal(payMethodObj : any){
    if(payMethodObj.id == '6'){
      this.payMethod = 6;
    }else if(payMethodObj.id == '7'){
      this.payMethod = 7;
    }else{
      this.payMethod = 5;
    }
    this.ConvenienceFeePercent = payMethodObj.field_value;
    this.paymentMethod = payMethodObj.field_name;
  }

  CalSettlementTypeAmount(settlementTypeObj : any){
    this.SelectedSettlementAmountType = settlementTypeObj.amount_type;
    this.SelectedSettlementAmountID = settlementTypeObj.id;
    this.SelectedSettlementAmountValue = settlementTypeObj.value;
  }


}
