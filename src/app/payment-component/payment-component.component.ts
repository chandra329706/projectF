import { Component, OnInit, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PaymentService} from './payment-component.service';
import {Router, ActivatedRoute} from "@angular/router";
var sha512 = require('sha512');
@Component({
  selector: 'app-payment-component',
  templateUrl: './payment-component.component.html',
  styleUrls: ['./payment-component.component.css'],
  providers : [PaymentService]
})

export class PaymentComponentComponent {

  api_key :any = '2a757ac8-790f-42fe-92f5-892c71134207';
  salt_key :any = 'b55a5b339052750c263cb01ce236f611a17c5538';
  Currency :any = 'INR';
  returnUrl :any = 'http://flexypay.in/payment/response'; //payment/response.php
  Country : any = 'IND';
  Name :any;
  Email :any;
  Phone : any;
  City : any;
  Zipcode : any;
  PaymentOrderID : any;
  PayableAmount : any;
  PayableRemarks : any;
  CalculatedHash : any = "";
  UserDetails :any;
  TransactionId : any;
  PaymentFor : any;
  DisablePay : boolean; 
  UId : any;
  Code : any;
  RequestPayentDetails : any=[];
  GeoLocationData : any = {};
 
  constructor(private _paymentService : PaymentService, private _active_route : ActivatedRoute, private _route : Router ) { }
  
  ngOnInit() {
   this._active_route.params.subscribe(params=>{
    this.UId = params['TransactionId'];
   })
   if(this.UId!=undefined){
     this._paymentService.getLocation().subscribe(Ldata => {
       this.GeoLocationData = Ldata;
       this._paymentService.getRequestpaymentDetails(this.UId).subscribe(Pdata=>{
       this.RequestPayentDetails = Pdata;
       if(this.RequestPayentDetails.status == 1){
          this.Name = this.RequestPayentDetails.name;
          this.Email = this.RequestPayentDetails.mail_id;
           this.Phone = '+91'+this.RequestPayentDetails.phone_no;
          this.PaymentFor = 'RequestPayment';
          this.PayableRemarks = this.RequestPayentDetails.purpose;
          this.TransactionId = this.UId;
          this.PayableAmount = this.RequestPayentDetails.amount;
          this.Code = "123";
          this.Zipcode = this.GeoLocationData.zip;
          this.City = this.GeoLocationData.city;
          this.PaymentOrderID = this.UId;
          var hashData = "";
          hashData = this.salt_key+'|'+this.PayableAmount+'|'+this.api_key+'|'+this.City+'|'+this.Country+'|'+this.Currency+'|'+this.PayableRemarks+'|'+this.Email+'|LIVE|'+this.Name+'|'+this.PaymentOrderID+'|'+this.Phone+'|'+this.returnUrl+'|'+this.TransactionId+'|'+this.PaymentFor+'|'+this.UId+'|'+this.Code+'|'+this.Zipcode;
          var HashEncoded = sha512(hashData).toString('hex');
          this.CalculatedHash = HashEncoded.toUpperCase();
          setInterval(()=>{
            this.FormAutoSubmit();
          },5000);
       }
     })
    });
   }
  }

  SubmitPaymentDetails(PaymetFormDetails){
     this._paymentService.getUserDeatils(PaymetFormDetails.UId).subscribe(UDetais=>{
       if(PaymetFormDetails.PaymentFor=="College" || PaymetFormDetails.PaymentFor=="School"){
         this.api_key = '529da4e1-a76d-4ff9-adcc-b4b3ae19a478';
         this.salt_key = '6d0c07ed957f9ac50b436980d6e116901e9b4bd2';
       }
       if(PaymetFormDetails.PaymentMethod == 'jio wallet'){
         this.api_key = '8676e659-2644-4614-856b-62140575b7b6';
         this.salt_key = 'c3119ab44588fc5ea98f0aec8e3ccb7178645ea5';
       }
      this.UserDetails = UDetais;
      this.Name = this.UserDetails.user_name;
      this.Email = this.UserDetails.user_email;
      this.Phone = '+91'+this.UserDetails.user_mobile;
      this.City = this.UserDetails.city;
      this.Zipcode = this.UserDetails.pincode;
      this.PayableAmount = PaymetFormDetails.TotalAmount;
      this.PayableRemarks = PaymetFormDetails.Remarks;
      this.PaymentOrderID = PaymetFormDetails.OrderID;
      this.TransactionId = PaymetFormDetails.TransactionId;
      this.PaymentFor = PaymetFormDetails.PaymentFor;
      this.UId = PaymetFormDetails.UId;
      this.Code = PaymetFormDetails.Signature;
      var hashData = "";
      hashData = this.salt_key+'|'+this.PayableAmount+'|'+this.api_key+'|'+this.City+'|'+this.Country+'|'+this.Currency+'|'+this.PayableRemarks+'|'+this.Email+'|LIVE|'+this.Name+'|'+this.PaymentOrderID+'|'+this.Phone+'|'+this.returnUrl+'|'+this.TransactionId+'|'+this.PaymentFor+'|'+this.UId+'|'+this.Code+'|'+this.Zipcode;
      // console.log(hashData);      
      var HashEncoded = sha512(hashData).toString('hex');
      this.CalculatedHash = HashEncoded.toUpperCase();
      setInterval(()=>{
        this.FormAutoSubmit();
      },5000);
      });   
  }

  FormAutoSubmit(){
    var myForm = <HTMLFormElement>document.getElementById('PaymentForm');
    myForm.submit();   
  }

}
