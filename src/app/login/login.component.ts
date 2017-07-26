import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Http, Headers, Response} from "@angular/http";
import {LoginService} from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [LoginService]
})
export class LoginComponent implements OnInit {

userIp : any;
LoggedUserDetails :any = {'status':''};
registrationDetails: any = {};
registrationResult: any = {};
FPEmail: any = '';
FPformSubmitted: boolean = false;
FPSubmitResult: any = {};
ReferalCode : string="";
ActiveLoginTab : any;
ActiveLoginTabContent : any;
ActiveRegistrationTab : any;
ActiveRegistrationTabContent : any;


  constructor(private http: Http, private _router: Router, private _loginService : LoginService, private route : ActivatedRoute) { 
     
  }
  private base64textString:String="";
  
  ngOnInit() {    
      localStorage.clear();
      this.FPSubmitResult.message = "";
      this.FPformSubmitted = false;
      this.registrationResult.message = '';
      this._loginService.getloginIp().subscribe(uip => {this.userIp = uip; console.log(this.userIp)});
      this.route.params.subscribe(params => {
          this.ReferalCode = params['ReferalCode'];
      });
      this.registrationDetails.referal_code = (this.ReferalCode!=undefined)?this.ReferalCode:'';
      this.ActiveLoginTab = (this.ReferalCode==undefined)?(this.ActiveLoginTab = "active" ,this.ActiveLoginTabContent = "tab-pane fadein active"):(this.ActiveLoginTabContent = "tab-pane fade", this.ActiveLoginTab="");
      this.ActiveRegistrationTab = (this.ReferalCode==undefined)?(this.ActiveRegistrationTabContent="tab-pane fade",this.ActiveRegistrationTab=""):(this.ActiveRegistrationTab = "active", this.ActiveRegistrationTabContent="tab-pane fade in active"); 
  }

  
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

  onLogin(loginCredentials : any){
    loginCredentials.ip = this.userIp.ip;
    this._loginService.makeUserLogin(loginCredentials).subscribe(uData => {
    this.LoggedUserDetails = uData;
console.log(this.LoggedUserDetails);
      if(this.LoggedUserDetails.status==1){
        
        localStorage.setItem('currentUserToken', this.LoggedUserDetails.data.token);
        localStorage.setItem('currentUserId', this.LoggedUserDetails.data.id);
        localStorage.setItem('currentUserName', this.LoggedUserDetails.data.Username);
        localStorage.setItem('currentWalletBalance', this.LoggedUserDetails.data.wallet_balance);
        localStorage.setItem('UserStatus', this.LoggedUserDetails.data.user_status);
        localStorage.setItem('referral_code', this.LoggedUserDetails.data.referral_code);
        localStorage.setItem('profile_photo', this.LoggedUserDetails.data.profile_photo);

        // this._router.navigate(['/makepayments']);
        window.location.href='http://flexypay.in/';
        // window.location.href='http://localhost:4200/makepayments/';
      }else{
        this._router.navigate(['/']);
        // window.location.href='http://flexypay.in/login';
      }
    });
  }

  registration(){
    this.registrationDetails.ip = this.userIp.ip;
    this.registrationDetails.pancard_image = this.base64textString;
    this._loginService.registration(this.registrationDetails).subscribe(res=>{
      this.registrationResult = res;
    });
  }

  FPFormSubmit(){
    this.FPformSubmitted = true;
    this._loginService.FPFormSubmit(this.FPEmail).subscribe(res=>{this.FPSubmitResult=res;});
  }

}
