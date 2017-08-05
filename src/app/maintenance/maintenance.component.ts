import { Component, OnInit,ViewChild } from '@angular/core';
import {MaintainanceService} from './maintenance.service';
import {Router, ActivatedRoute} from "@angular/router";
import {PaymentComponentComponent} from '../payment-component/payment-component.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
  providers : [MaintainanceService]
})
export class MaintenanceComponent implements OnInit {

  @ViewChild('paymentFormComponent') paymentComponent : PaymentComponentComponent;

  constructor(private _maintenanceService : MaintainanceService,private route : ActivatedRoute) { }

  MakeActive : any = true;
  CurrentYear : any = new Date().getFullYear();
  SelectedYear :any="";
  SelectedMonth : any="";
  Remarks : any = "";

  MaintainanceListData : any = [];
  selectedProperty : any = "";
  rentType: any = 1;
  totalMaintainanceDetails : any;
  PaymentGatewayList :any = [];
  PaymentMethodList : any =[];
  SettlementList : any = [];
  settlementAmount : any = 0;
  selectedSettlementId: Number;
  selectedPaymentMethodId: Number = 5;
  selectedPaymentGateway: Number = 0;
  payMethod : any;
  showBreakdown: boolean = false;

  walletBalance: Number = 0;
  useWalletAmount :boolean = false;
  walletAmountUsed: number = 0;
  wallet : any = {"percentage": "10","minusAmount": "0"};
  discountAmount: number = 0;
  
  maintenancePropertyName : any = '-';
  Ifsc : any = '-';
  accountNumber : any = '-';
  ActualAmount : any;
  Amount : any = (this.ActualAmount==NaN || this.ActualAmount==undefined)?0:this.ActualAmount;
  WalletBalance : any = '0.00';
  NameAsPerBank : any ='-';
  TenantName : any = '-';  
 
  TaxesList : any = [];
  UpdatedTaxesList : any = [];
  ConvenienceFeeAmount : any = 0;
  ConvenienceFeePercent : any = 0;
  TotalAmount : any = 0;
  paymentMethod :any = '-';
  TaxTotal :any = 0;
  coupon : any = '0';
  toSendData: any = {};
  paymentResult: any = [];
  MId : any;
  UserStatus : any;
  DisablePay : any;
  ActiveMenusData : any = [];
  IsMenuActive  :any;
  DisableUserPay : boolean = false;

  ngOnInit() {
    // console.log('AA >>> '+this.ActualAmount);
    // console.log('A >>> '+this.Amount);
    this.DisablePay = false;
    this.ActiveMenusData.data = [];
    this.UserStatus =  localStorage.getItem('UserStatus');
    this._maintenanceService.checkActiveMenus().subscribe(MData => {
      this.ActiveMenusData = MData;   
      this.IsMenuActive = 0;
      this.UserStatus = this.ActiveMenusData.user_status;
       if(this.UserStatus == 1 || this.UserStatus == 6){
        this.DisableUserPay = true;
      } 
      this.ActiveMenusData.data.forEach(Menu => {        
        if(Menu.service_id == 4){
          this.IsMenuActive = 1;
        }
      });
    });
    // this.selectedProperty = ' ';
    this._maintenanceService.getMaintenanceList().subscribe(cData => this.MaintainanceListData = cData);
    this.walletBalance = Number(localStorage.getItem('currentWalletBalance'));
    this._maintenanceService.getPaymentMethodList().subscribe(pmData =>{
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
    this._maintenanceService.getPaymentGatewayList().subscribe(pgData => {this.PaymentGatewayList = pgData;this.checkPaymentGateway(this.PaymentGatewayList.data[0])});
    this._maintenanceService.getSettlementList().subscribe(sData => {this.SettlementList = sData; this.calculateSettlementAmount(this.SettlementList.data[0]);})
    this._maintenanceService.getTaxesList().subscribe(tData => {
      this.TaxesList = tData;
      if(this.TaxesList.status == 1){
          this.TaxesList.data.forEach(tax => {
              tax.tax_value = 0;
              this.UpdatedTaxesList.push(tax);
          });
      }            
    });

    this.route.params.subscribe(params => {
          this.selectedProperty = +params['id'];
      });
    if(this.selectedProperty){
        this.getMaintenanceDetails();
      }
  }

  changeTab(type:any){
      this.MakeActive = true;
  }

  checkPaymethod(payMethodObj : any){
    this.Amount = (this.ActualAmount==NaN || this.ActualAmount==undefined)?0:this.ActualAmount;
    this.Amount = (this.Amount=="")?0:this.Amount; 
    this.TaxTotal = 0;
    if(payMethodObj!=0){
      if(payMethodObj.id == '6'){
      this.payMethod = 6;
      }else{
        this.payMethod = 5;
      }
      this.selectedPaymentMethodId = payMethodObj.id;
      this.ConvenienceFeePercent = payMethodObj.field_value;
      this.paymentMethod = payMethodObj.field_name;
    }
   
    this.ConvenienceFeeAmount = (this.Amount/100)*this.ConvenienceFeePercent;
    // Adding the settlement amount to the convenience fee
    this.ConvenienceFeeAmount = parseFloat(this.ConvenienceFeeAmount) + parseFloat(this.settlementAmount);

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
          tax.tax_value = tax.tax_amount;
      }  
    });
    this.TotalAmount = parseFloat(this.ConvenienceFeeAmount)+parseFloat(this.Amount)+parseFloat(this.TaxTotal);
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

  getMaintenanceDetails(){
    this._maintenanceService.getPropertyMaintenanceDetails(this.selectedProperty).subscribe(mData => {
      this.totalMaintainanceDetails = mData;
      if(this.totalMaintainanceDetails.status == 1){
          this.maintenancePropertyName = this.totalMaintainanceDetails.property_name;
          this.TenantName = this.totalMaintainanceDetails.owner_name;
          this.NameAsPerBank = this.totalMaintainanceDetails.bank_account_name;
          this.Ifsc = this.totalMaintainanceDetails.ifsc;
          this.accountNumber = this.totalMaintainanceDetails.bank_account_number;
      }
    });
  }


  payFee(){
    this.DisablePay = true;
    let taxes = JSON.stringify(this.UpdatedTaxesList);
    this.toSendData.property_id = this.selectedProperty;
    this.toSendData.payment_rent_type = this.rentType;
    this.toSendData.month = this.SelectedMonth;
    this.toSendData.year = this.SelectedYear;
    this.toSendData.remarks = (this.Remarks=='')?"Maintenance Fee Payment":this.Remarks;
    this.toSendData.amount = this.Amount;
    this.toSendData.mode_of_payment = this.selectedPaymentMethodId;
    this.toSendData.settlement_type = this.selectedSettlementId;
    this.toSendData.payment_gateway = this.selectedPaymentGateway;
    this.toSendData.bank_account_holder = this.NameAsPerBank;
    this.toSendData.bank_account_number = this.accountNumber;
    this.toSendData.bank_name = this.totalMaintainanceDetails.bank_name;
    this.toSendData.ifsc_code = this.totalMaintainanceDetails.ifsc;
    this.toSendData.wallet_amount = this.walletBalance;
    this.toSendData.discount_amount = 0;
    this.toSendData.convenience_fee = this.ConvenienceFeeAmount;
    this.toSendData.final_amount = this.TotalAmount
    this.toSendData.coupon_id = this.coupon;
    this.toSendData.taxes = taxes;
    this._maintenanceService.payFee(this.toSendData).subscribe(res => {
      this.paymentResult = res;
      if(this.paymentResult.status == 1){
        var PaymetFormDetails = {'TotalAmount':Math.round(this.TotalAmount),'Remarks':(this.Remarks=='')?"Maintenance Fee Payment":this.Remarks,'OrderID':this.paymentResult.transaction_code,'TransactionId':this.paymentResult.transaction_id,'PaymentFor':'Maintenance','PaymentMethod':this.paymentMethod,'UId':localStorage.getItem('currentUserId'),'Signature':localStorage.getItem('currentUserToken')};
        this.paymentComponent.SubmitPaymentDetails(PaymetFormDetails);
      }
    });
  }

   _keyPress(event: any) {
      const pattern = /[0-9]/;
      
      let inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
  }
  showAmountBreakdown(){
    this.showBreakdown = !this.showBreakdown;
    console.log('came to function');
  }
}