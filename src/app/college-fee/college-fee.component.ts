import { Component, OnInit, ViewChild } from '@angular/core';
import {CollegeFeeService} from './college-fee.service';
import {Router, ActivatedRoute} from "@angular/router";
import {PaymentComponentComponent} from '../payment-component/payment-component.component';

@Component({
  selector: 'app-college-fee',
  templateUrl: './college-fee.component.html',
  styleUrls: ['./college-fee.component.css'],
  providers : [CollegeFeeService]
})
export class CollegeFeeComponent implements OnInit {

   @ViewChild('paymentFormComponent') paymentComponent : PaymentComponentComponent;

  constructor(private _collegeFeeService : CollegeFeeService,private route : ActivatedRoute) { }
  
  CollegeListData : any = [];
  CollegePurposeListData : any = [];
  selectedCollege :any;
  selectedPurpose :any;
  totalCollegeDetails : any;
  PaymentGatewayList :any = [];
  PaymentMethodList : any = [];
  SettlementList : any = [];
  payMethod : any;
  Remarks : any = "";
  collegeName : any = '-';
  NameAsperBank : any = '-';
  Ifsc : any = '-';
  accountNumber : any = '-';
  ActualAmount : any;
  Amount : any = (this.ActualAmount==NaN || this.ActualAmount==undefined)?0:this.ActualAmount;
  Group : any = '-';
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
  selectedPaymentMethodId: Number = 5;
  selectedSettlementId: Number;
  selectedPaymentGateway: Number = 0;
  walletBalance: Number = 0;
  useWalletAmount :boolean = false;
  walletAmountUsed: number = 0;
  discountAmount: number = 0;
  wallet : any = {"percentage": "10","minusAmount": "0"};
  settlementAmount : any = 0;
  toSendData: any = {};
  coupon: string = '';
  paymentResult: any = {};
  UserStatus : any;
  TaxTotal :any = 0;
  DisablePay : any;
  ActiveMenusData :any = [];
  IsMenuActive : any;
  DisableUserPay : boolean = false;

  ngOnInit() {
    this.DisablePay =false;
    //this.UserStatus = localStorage.getItem('UserStatus');
    this.selectedPurpose = "";
    this.selectedCollege = '';
    this._collegeFeeService.checkActiveMenus().subscribe(MData => {
      this.ActiveMenusData = MData;
      console.log(this.ActiveMenusData);
      this.IsMenuActive = 0;   
      this.UserStatus = this.ActiveMenusData.user_status;
      if(this.UserStatus == 1 || this.UserStatus == 6){
        this.DisableUserPay = true;
      }
      this.ActiveMenusData.data.forEach(Menu => {   
        if(Menu.service_id == 3){
          this.IsMenuActive = 1;
        }
      });
    });
    this.walletBalance = Number(localStorage.getItem('currentWalletBalance'));
    this._collegeFeeService.getCollegesList().subscribe(cData => this.CollegeListData = cData);
    this._collegeFeeService.getCollegePurposeList().subscribe(spData => this.CollegePurposeListData = spData);
    this._collegeFeeService.getPaymentMethodList().subscribe(pmData =>{
      this.PaymentMethodList = pmData;
      // console.log(this.PaymentMethodList);
      if(this.PaymentMethodList.status == 1){
        this.PaymentMethodList.data.forEach(payMethod => {
              if(payMethod.id==5){
                this.ConvenienceFeePercent = payMethod.field_value;
                this.paymentMethod = payMethod.field_name;
              }
          });
          // console.log(this.PaymentMethodList.data.indexOf(2));
          
          // this.PaymentMethodList.data.splice(this.PaymentMethodList.data.indexOf(2));
      }
    });
    this._collegeFeeService.getPaymentGatewayList().subscribe(pgData => {this.PaymentGatewayList = pgData; console.log(this.PaymentGatewayList);
    });
    this._collegeFeeService.getSettlementList().subscribe(sData => {this.SettlementList = sData; this.calculateSettlementAmount(this.SettlementList.data[0]);})
    this._collegeFeeService.getTaxesList().subscribe(tData => {
      this.TaxesList = tData;
      if(this.TaxesList.status == 1){
          this.TaxesList.data.forEach(tax => {
              tax.tax_value = 0;
              this.UpdatedTaxesList.push(tax);
          });
      }            
    });

     this.route.params.subscribe(params => {
          this.selectedCollege = +params['id'];
      });
    if(this.selectedCollege){
        this.getBCollegeDetails();
      }

    this.checkPaymethod(0);
  }

  getBCollegeDetails(){      
      this._collegeFeeService.getSchoolTotalDetails(this.selectedCollege).subscribe(collegeDetails =>{
      this.totalCollegeDetails = collegeDetails;
      this.collegeName = this.totalCollegeDetails.college_name;
      this.accountNumber = this.totalCollegeDetails.bank_account_number;
      this.NameAsperBank = this.totalCollegeDetails.bank_account_name;
      this.Ifsc = this.totalCollegeDetails.ifsc;
      this.StudentName = this.totalCollegeDetails.student_name;
      this.Group = this.totalCollegeDetails.class;
      this.State = this.totalCollegeDetails.state;
      this.RollNo = this.totalCollegeDetails.roll_number;
      this.Section = this.totalCollegeDetails.section;
    });
  }

  calculateSettlementAmount(sObj){
    if(sObj.amount_type == 1){
      this.settlementAmount = sObj.value;
    }
    if(sObj.amount_type == 2){
      this.settlementAmount = this.Amount*(sObj.value/100);
    }
      this.selectedSettlementId = sObj.id;
      this.checkPaymethod(0);
  }

  checkPaymentGateway(Pgateway){
    this.selectedPaymentGateway = Pgateway.id;
  }

  checkPaymethod(payMethodObj : any){
    this.Amount = (this.ActualAmount==NaN || this.ActualAmount==undefined)?0:this.ActualAmount;
    this.Amount = (this.Amount=="")?0:this.Amount;
    this.TaxTotal = 0;
    // console.log(payMethodObj);
    
    if(payMethodObj!=0){
      if(payMethodObj.id == '7'){
      this.payMethod = 7;
      }else if(payMethodObj.id == '6'){
        this.payMethod = 6;
      }else{
        this.payMethod = 5;
      }
      this.ConvenienceFeePercent = payMethodObj.field_value;
      this.paymentMethod = payMethodObj.field_name;
      this.selectedPaymentMethodId = Number(payMethodObj.id);
    }
   
    this.ConvenienceFeeAmount = (this.Amount/100)*this.ConvenienceFeePercent;

    // Adding the settlement amount to the convenience fee
    this.ConvenienceFeeAmount = parseFloat(this.ConvenienceFeeAmount) + parseFloat(this.settlementAmount);

    // this.calculateSettlementAmount(this.SettlementList.data[0]);
    if(this.useWalletAmount == true){
      this.walletBalance = Number(localStorage.getItem('currentWalletBalance'));
    
      if((this.ConvenienceFeeAmount*this.wallet.percentage/100) <= this.walletBalance)
      {
        this.walletAmountUsed = this.ConvenienceFeeAmount*this.wallet.percentage/100;
        this.ConvenienceFeeAmount = this.ConvenienceFeeAmount-(this.walletAmountUsed);
        this.walletBalance = Number(this.walletBalance) - this.walletAmountUsed;
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
           this.TaxTotal = Number(tax.tax_value)+Number(this.TaxTotal);           
    });
    this.TotalAmount = Math.ceil(parseFloat(this.ConvenienceFeeAmount)+parseFloat(this.Amount)+parseFloat(this.TaxTotal));
  }

  payFee(){
    this.DisablePay = true;
    let taxes = JSON.stringify(this.UpdatedTaxesList);
    this.toSendData.college_id = this.selectedCollege;
    this.toSendData.purpose = this.selectedPurpose;
    this.toSendData.amount = this.Amount;
    this.toSendData.mode_of_payment = this.selectedPaymentMethodId;
    this.toSendData.settlement_type = this.selectedSettlementId;
    this.toSendData.payment_gateway = this.selectedPaymentGateway;
    this.toSendData.bank_account_holder = this.NameAsperBank;
    this.toSendData.bank_account_number = this.accountNumber;
    this.toSendData.bank_name = this.totalCollegeDetails.bank_name;
    this.toSendData.ifsc_code = this.Ifsc;
    this.toSendData.wallet_amount = this.walletBalance;
    this.toSendData.discount_amount = this.discountAmount;
    this.toSendData.convenience_fee = this.ConvenienceFeeAmount;
    this.toSendData.final_amount = this.TotalAmount;
    this.toSendData.coupon_id = this.coupon;
    this.toSendData.taxes = taxes;
    this.toSendData.remarks = (this.Remarks=='')?"College Fee Payment":this.Remarks;
    this._collegeFeeService.payFee(this.toSendData).subscribe(res => {
      this.paymentResult = res;
      console.log(this.paymentResult);
      if(this.paymentResult.status == 1)
      {
         var PaymetFormDetails = {'TotalAmount':Math.round(this.TotalAmount),'Remarks':(this.Remarks=='')?"College Fee Payment":this.Remarks,'OrderID':this.paymentResult.transaction_code,'TransactionId':this.paymentResult.transaction_id,'PaymentMethod':this.paymentMethod,'PaymentFor':'College','UId':localStorage.getItem('currentUserId'),'Signature':localStorage.getItem('currentUserToken')};
         console.log(PaymetFormDetails);
        this.paymentComponent.SubmitPaymentDetails(PaymetFormDetails);
      }
    });
  }

   _keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      // console.log('sdfsfsdfsdf');
      
      let inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar)) {
        // console.log('sdfsfsdfsdf1');
        // invalid character, prevent input
        event.preventDefault();
      }
  }


}
