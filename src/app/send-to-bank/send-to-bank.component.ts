import { Component, OnInit, ViewChild } from '@angular/core';
import {SendToBankService} from './send-to-bank.service';
import {Router, ActivatedRoute} from "@angular/router";
import { ViewBeneficiaryService } from '../view-beneficiary/view-beneficiary.service';
import {PaymentComponentComponent} from '../payment-component/payment-component.component';

@Component({
  selector: 'app-send-to-bank',
  templateUrl: './send-to-bank.component.html',
  styleUrls: ['./send-to-bank.component.css'],
  providers : [SendToBankService, ViewBeneficiaryService]
})
export class SendToBankComponent implements OnInit {

  @ViewChild('paymentFormComponent') paymentComponent : PaymentComponentComponent;

  constructor(private _bankService : SendToBankService, private _viewBeneficiaryService : ViewBeneficiaryService,private route : ActivatedRoute) { }

  selectedPurpose :any;
  otherPurpose : any = '';
  DisablePay: boolean;
  UserListData : any = [];
  UserPurposeListData : any = [];
  selectedUser :any = "";
  totalUserDetails : any;
  PaymentGatewayList :any = [];
  PaymentMethodList : any =[];
  payMethod : any;
  selectedSettlementId: Number;
  selectedPaymentMethodId: Number = 5;
  userName : any = '-';
  Ifsc : any = '-';
  accountNumber : any = '-';
  ActualAmount : any;
  Amount : any = (this.ActualAmount==NaN || this.ActualAmount==undefined)?0:this.ActualAmount;
  WalletBalance : any = '0.00';
  BankName : any ='-';
  settlementAmount : any = 0;
  TaxesList : any = [];
  UpdatedTaxesList : any = [];
  ConvenienceFeeAmount : any = 0;
  ConvenienceFeePercent : any = 0;
  TotalAmount : any = 0;
  paymentMethod :any = '-';
  TaxTotal :any = 0;
  SettlementList : any = [];
  toSendData: any = {};
  Remarks : any="";
  selectedPaymentGateway : any;
  walletBalance: any = 0;
  useWalletAmount :boolean = false;
  wallet : any = {"percentage": "10","minusAmount": "0"};
  walletAmountUsed: number = 0;
  coupon : any;
  paymentResult : any = [];
  BId : any;
  UserStatus : any;
  ActiveMenusData : any;
  IsMenuActive : any;
  DisableUserPay ; boolean = false;


  ngOnInit() {    
    this.selectedPurpose = "";
    this.selectedUser = '';
    this.DisablePay = false;
    this.UserStatus = localStorage.getItem('UserStatus');
    this._bankService.checkActiveMenus().subscribe(MData => {
      this.ActiveMenusData = MData;  
      this.IsMenuActive = 0;  
      this.UserStatus = this.ActiveMenusData.user_status;
      if(this.UserStatus == 1 || this.UserStatus == 6){
        this.DisableUserPay = true;
      }
      this.ActiveMenusData.data.forEach(Menu => {  
        if(Menu.service_id == 5){
          this.IsMenuActive = 1;
        }        
      });
    });
        
    this.walletBalance = Number(localStorage.getItem('currentWalletBalance'));
    this._bankService.getUsersList().subscribe(cData => this.UserListData = cData);
    this._bankService.getUserPurposeList().subscribe(spData => this.UserPurposeListData = spData);
    this._bankService.getSettlementList().subscribe(sData => {this.SettlementList = sData; this.calculateSettlementAmount(this.SettlementList.data[0]);})
    this._bankService.getPaymentMethodList().subscribe(pmData =>{
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
    this._bankService.getPaymentGatewayList().subscribe(pgData => {
      this.PaymentGatewayList = pgData; 
      if(this.PaymentGatewayList.status == 1){

        this.checkPaymentGateway(this.PaymentGatewayList.data[0]);
      }
      
    });
    this._bankService.getTaxesList().subscribe(tData => {
      this.TaxesList = tData;
      if(this.TaxesList.status == 1){
          this.TaxesList.data.forEach(tax => {
              tax.tax_value = 0;
              this.UpdatedTaxesList.push(tax);
          });
      }            
    });

    this.route.params.subscribe(params => {
        this.selectedUser = +params['id'];
    });

      if(this.selectedUser){
        this.getBUserDetails();
      }

  }


  getBUserDetails(){
    this._bankService.getBeneficiaryTotalDetails(this.selectedUser).subscribe(userDetails =>{
      this.totalUserDetails = userDetails;
      console.log(this.totalUserDetails);
      this.userName = this.totalUserDetails.bank_account_name;
      this.accountNumber = this.totalUserDetails.bank_account_number;
      this.BankName = this.totalUserDetails.bank_name;
      this.Ifsc = this.totalUserDetails.ifsc;   

    });
  }

  checkPaymethod(payMethodObj : any){
    this.Amount = (this.ActualAmount==NaN || this.ActualAmount==undefined)?0:this.ActualAmount;
    this.Amount = (this.Amount=="")?0:this.Amount;
    this.TaxTotal = 0;
    if(payMethodObj!=0){
      if(payMethodObj.id == '6'){
      this.payMethod = 6;
      }else{
        this.payMethod = '';
      }
      this.selectedPaymentMethodId = payMethodObj.id;
      this.ConvenienceFeePercent = payMethodObj.field_value;
      this.paymentMethod = payMethodObj.field_name;
    }
   
    this.ConvenienceFeeAmount = (this.Amount/100)*this.ConvenienceFeePercent;
    this.ConvenienceFeeAmount = parseFloat(this.ConvenienceFeeAmount) + parseFloat(this.settlementAmount);


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
           this.TaxTotal = parseFloat(tax.tax_value)+parseFloat(this.TaxTotal);
      }else{   // tax_type = 1 --> fixed amount
          this.TaxTotal = parseFloat(tax.tax_amount)+parseFloat(this.TaxTotal);
           tax.tax_value = tax.tax_amount;
      }   
      });
    this.TotalAmount = parseFloat(this.ConvenienceFeeAmount)+parseFloat(this.Amount)+parseFloat(this.TaxTotal);
  }

  // getBenificiaryBankDetails(bankId){
  //   this._viewBeneficiaryService.getbenificiaryDetail(bankId);
  // }

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
    // console.log(this.selectedPaymentGateway);
  }

    payFee(){
    this.DisablePay = true;
    let taxes = JSON.stringify(this.UpdatedTaxesList);
    console.log(this.selectedUser);
    this.toSendData.beneficiary_id = this.selectedUser;
    this.toSendData.remarks = (this.Remarks=='')?"Bank Payment":this.Remarks;
    this.toSendData.amount = this.Amount;
    this.toSendData.mode_of_payment = this.selectedPaymentMethodId;
    this.toSendData.settlement_type = this.selectedSettlementId;
    this.toSendData.payment_gateway = this.selectedPaymentGateway;
    this.toSendData.bank_account_holder = this.userName;
    this.toSendData.bank_account_number = this.accountNumber;
    this.toSendData.bank_name = this.BankName;
    this.toSendData.ifsc_code = this.Ifsc;
    this.toSendData.wallet_amount = this.walletBalance;
    this.toSendData.discount_amount = 0;
    this.toSendData.convenience_fee = this.ConvenienceFeeAmount;
    this.toSendData.final_amount = this.TotalAmount
    this.toSendData.coupon_id = this.coupon;
    this.toSendData.taxis = taxes;
    this.toSendData.coupon_id = 0;
    // this.toSendData.purpose = this.selectedPurpose;
    this.toSendData.purpose = this.Remarks;
    // console.log(this.toSendData);
    this._bankService.payFee(this.toSendData).subscribe(res => {
      this.paymentResult = res;
      // console.log(this.paymentResult);
      if(this.paymentResult.status == 1){
        // this.DisablePay = false;  
        var PaymetFormDetails = {'TotalAmount':Math.round(this.TotalAmount),'Remarks':(this.Remarks=='')?"Bank Payment":this.Remarks,'OrderID':this.paymentResult.transaction_code,'TransactionId':this.paymentResult.transaction_id,'PaymentFor':'Bank','PaymentMethod':this.paymentMethod,'UId':localStorage.getItem('currentUserId'),'Signature':localStorage.getItem('currentUserToken')};
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
