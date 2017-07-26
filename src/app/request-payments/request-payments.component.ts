import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {RequestPaymentService} from './request-payments.service';

@Component({
  selector: 'app-request-payments',
  templateUrl: './request-payments.component.html',
  styleUrls: ['./request-payments.component.css'],
  providers : [RequestPaymentService]
})
export class RequestPaymentsComponent implements OnInit {

  constructor(private _requestPaymentService : RequestPaymentService) { }

  RequestResponse : any = {};
  selectedPayee : Number = 1;
  Disabled : boolean = false;
  ResponseMessage : any = "";
  UserStatus :any;
  ActiveMenusData :any = [];
  IsMenuActive : any;
  
  ngOnInit() {
    // this.UserStatus = localStorage.getItem('UserStatus');
    this._requestPaymentService.checkActiveMenus().subscribe(MData => {
      this.ActiveMenusData = MData;
      this.IsMenuActive = 0;
      this.UserStatus = this.ActiveMenusData.user_status;
      if(this.UserStatus == 1 || this.UserStatus == 6){
        this.Disabled = true;
      }
      this.ActiveMenusData.data.forEach(Menu => {
        if(Menu.service_id == 6){
          this.IsMenuActive = 1;
        }
      });
    });
  }

  private base64textString:String="";

  uploadFile(File:any){
    let file = File.target.files[0];
    let reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

  _handleReaderLoaded(readerEvt) {
     let binaryString = readerEvt.target.result;
     this.base64textString= btoa(binaryString);           
    }

    InitiateRequestPayment(requestPayment : NgForm){
      this.Disabled = true;
      let data = {
        'name':requestPayment.value.user_name,
        'purpose':requestPayment.value.purpose,
        'mail_id':requestPayment.value.mail_id,
        'amount':requestPayment.value.amount,
        'phone_no':requestPayment.value.phone_number,
        'document':this.base64textString,
        'request_type':this.selectedPayee
      };

      this._requestPaymentService.submitRequestPaymnent(data).subscribe(Pdata => {
        this.RequestResponse = Pdata
        console.log(this.RequestResponse);
        
        if(this.RequestResponse.status == 1){
          requestPayment.reset();
          this.ResponseMessage = this.RequestResponse.message;
        }
        this.Disabled = false;
      });
    }

    

}
