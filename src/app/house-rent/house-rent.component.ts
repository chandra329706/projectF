import { Component, OnInit, ViewChild } from '@angular/core';
import { HouseRentService } from './house-rent.service';
import { Router, ActivatedRoute } from "@angular/router";
import {PaymentComponentComponent} from '../payment-component/payment-component.component';

@Component({
  selector: 'app-house-rent',
  templateUrl: './house-rent.component.html',
  styleUrls: ['./house-rent.component.css'],
  providers: [HouseRentService]
})
export class HouseRentComponent implements OnInit {

  @ViewChild('paymentFormComponent') paymentComponent : PaymentComponentComponent;

  DisablePay :any;
  MakeActive : any = true;
  CurrentYear : any = new Date().getFullYear();
  SelectedYear :any="";
  SelectedMonth : any="";
  selectedProperty: any = '';
  remarks: any = '';

  rentType: any = 1;
  propertiesList: any = [];
  propertyDetails: any = {};
  selectedProps: any = {};
  ActualAmount : any;
  Amount : any = (this.ActualAmount==NaN || this.ActualAmount==undefined)?0:this.ActualAmount;
  useWalletAmount: boolean = false;
  discountAmount: number = 0;
  PaymentMethodList: any = {};
  PaymentGatewayList :any = [];
  SettlementList : any = [];
  settlementAmount : any = 0;
  selectedSettlementId: Number;
  ConvenienceFeeAmount : any = 0;
  ConvenienceFeePercent : any = 0;
  paymentMethod :any = '-';
  TaxTotal :any = 0;
  payMethod : any;
  selectedPaymentMethodId: Number = 5;
  selectedPaymentGateway: Number = 0;
  walletBalance: Number = 0;
  wallet : any = {"percentage": "10","minusAmount": "0"};
  walletAmountUsed: number = 0;
  coupon : any = '';
  toSendData: any = {};
  UpdatedTaxesList : any = [];
  TaxesList : any = [];
  TotalAmount : any = 0;
  houseRentId : any;
  paymentResult : any;
  UserStatus : any;
  ActiveMenusData :any = [];
  IsMenuActive  :any;
  DisableUserPay : boolean = false;

  constructor( private _HouseRentService: HouseRentService, private route:ActivatedRoute ) { }

  ngOnInit() {
    this.DisablePay = false;
    this.UserStatus = localStorage.getItem('UserStatus');
    this._HouseRentService.checkActiveMenus().subscribe(MData => {
      this.ActiveMenusData = MData;   
      this.IsMenuActive = 0;  
      this.UserStatus = this.ActiveMenusData.user_status;
       if(this.UserStatus == 1 || this.UserStatus == 6){
        this.DisableUserPay = true;
      }      
      this.ActiveMenusData.data.forEach(Menu => {        
        if(Menu.service_id == 1){
          this.IsMenuActive = 1;
        }
      });
    });
    this._HouseRentService.getPropertiesList().subscribe(res=>{this.propertiesList=res.data;});
    this._HouseRentService.getPaymentGatewayList().subscribe(pgData => {this.PaymentGatewayList = pgData});
    this._HouseRentService.getSettlementList().subscribe(sData => {this.SettlementList = sData; this.calculateSettlementAmount(this.SettlementList.data[0]);})

    this.walletBalance = Number(localStorage.getItem('currentWalletBalance'));
    this._HouseRentService.getPaymentMethodList().subscribe(pmData =>{
      this.PaymentMethodList = pmData;
      console.log('the payment methods list');
      console.log(this.PaymentMethodList);
      if(this.PaymentMethodList.status == 1){
        this.PaymentMethodList.data.forEach(payMethod => {
              if(payMethod.id==5){
                this.ConvenienceFeePercent = payMethod.field_value;
                this.paymentMethod = payMethod.field_name;
              }              
          });
      }
    });
    this._HouseRentService.getTaxesList().subscribe(tData => {
      this.TaxesList = tData;
      if(this.TaxesList.status == 1){
          this.TaxesList.data.forEach(tax => {
              tax.tax_value = 0;
              this.UpdatedTaxesList.push(tax);
          });
      }            
    });

    this.route.params.subscribe(params => {this.houseRentId = +params['id']});

    if(this.houseRentId){
      this.getPropertyDetails();
      this.selectedProperty  = this.houseRentId;
    }

    console.log(this.DisablePay);
    
   
  }


  getPropertyDetails(){
    this._HouseRentService.getPropertyDetails(this.selectedProperty).subscribe(res=>{this.propertyDetails=res;});
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
           this.TaxTotal = parseFloat(tax.tax_value)+parseFloat(this.TaxTotal);
      }else{   // tax_type = 1 --> fixed amount
          this.TaxTotal = parseFloat(tax.tax_amount)+parseFloat(this.TaxTotal);
      }
      // if (tax.tax_id!='' && tax.tax_value!='') this.toSendData.taxis.push({"tax_id": tax.tax_id,"tax_amount": tax.tax_value});
    });
    this.TotalAmount = parseFloat(this.ConvenienceFeeAmount)+parseFloat(this.Amount)+parseFloat(this.TaxTotal);
  } 


  payFee(){
    this.DisablePay = true;
    let taxes = JSON.stringify(this.UpdatedTaxesList);
    this.toSendData.property_id = this.selectedProperty;
    this.toSendData.payment_rent_type = this.rentType;
    this.toSendData.month = this.SelectedMonth;
    this.toSendData.year = this.SelectedYear;
    this.toSendData.remarks = this.remarks;
    this.toSendData.amount = this.Amount;
    this.toSendData.coupon_id = '';
    this.toSendData.mode_of_payment = this.selectedPaymentMethodId;
    this.toSendData.settlement_type = this.selectedSettlementId;
    this.toSendData.payment_gateway = this.selectedPaymentGateway;
    this.toSendData.bank_account_holder = this.propertyDetails.bank_account_name;
    this.toSendData.bank_account_number = this.propertyDetails.bank_account_number;
    this.toSendData.bank_name = this.propertyDetails.bank_name;
    this.toSendData.ifsc_code = this.propertyDetails.ifsc;
    this.toSendData.wallet_amount = this.walletBalance;
    this.toSendData.discount_amount = this.discountAmount;
    this.toSendData.convenience_fee = this.ConvenienceFeeAmount;
    this.toSendData.final_amount = this.TotalAmount;
    this.toSendData.coupon_id = this.coupon;
    this.toSendData.taxis = taxes;
    this._HouseRentService.payFee(this.toSendData).subscribe(res => {
      this.paymentResult = res;
      if(this.paymentResult.status == 1){
        var PaymetFormDetails = {'TotalAmount':Math.round(this.TotalAmount),'Remarks':(this.remarks=='')?"Bank Payment":this.remarks,'PaymentMethod':this.paymentMethod,'OrderID':this.paymentResult.transaction_code,'TransactionId':this.paymentResult.transaction_id,'PaymentFor':'HouseRent','UId':localStorage.getItem('currentUserId'),'Signature':localStorage.getItem('currentUserToken')};
        this.paymentComponent.SubmitPaymentDetails(PaymetFormDetails);
      }
      
    });
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
}


}
