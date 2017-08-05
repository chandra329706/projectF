import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  profileData: any ={};
  sendProfileResult: any ={};
  profileDataTemp: any = {};
  ProfilePicBase64 : any = '';
  CoverPhotoBase64 : any= "";
  UserProfilePhoto : any;
  UserCoverPhoto : any;
  UserStatus : any;
  UserPancard : any = "";
  PanCardLink : any= "";

  constructor(private _ProfileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.getProfileData();
    this.sendProfileResult.message = '';
    this.UserStatus = localStorage.getItem('UserStatus');
    this.profileData.pincode = '';
  }

  UploadPic(File:any,pic_type){
    let file = File.target.files[0];
    let reader = new FileReader();

    if(pic_type==0){ // pic_type = 0 profile pic 
      reader.onload = this._convertProfilePic.bind(this);
      reader.readAsBinaryString(file);
    }
    if(pic_type==1){ // pic_type = 1 cover photo 
      reader.onload = this._convertCoverPic.bind(this);
      reader.readAsBinaryString(file);
    }

    if(pic_type==2){   // 2 => pan card
      reader.onload = this._convertPanCard.bind(this);
      reader.readAsBinaryString(file);
    }
    
  }

  _convertPanCard(readerEvt){
    let PanbinaryString = readerEvt.target.result;
     this.UserPancard= btoa(PanbinaryString);
     console.log(this.UserPancard);
     
  }

  _convertProfilePic(readerEvt) {
     let profileBinaryString = readerEvt.target.result;
     this.ProfilePicBase64= btoa(profileBinaryString);
    }

    _convertCoverPic(readerEvt) {
     let binaryString = readerEvt.target.result;
     this.CoverPhotoBase64= btoa(binaryString);
     console.log(this.CoverPhotoBase64);            
    }



  sendProfileData(){
    this.sendProfileResult.message = '';
    this.profileDataTemp = this.profileData;
    this.profileDataTemp.user_email_id = this.profileData.user_email;
    this.profileDataTemp.house_number = this.profileData.house_no;
    // Need to fill all the details from here
    this.profileDataTemp.address='a';
    this.profileData.pancard = this.profileData.pancard;
    this.profileData.pancard_image = this.UserPancard;
    this.profileData.aadhar = 'aadhar';
    this.profileData.ifsc = this.profileData.bank_ifsc;

    this.profileDataTemp.profile_photo = this.ProfilePicBase64;
    this.profileDataTemp.cover_photo = this.CoverPhotoBase64;
    console.log(this.profileDataTemp);
    
    
    this._ProfileService.sendProfileData(this.profileData).subscribe(res=>{this.sendProfileResult = res; console.log(this.sendProfileResult); 
      
    });
  }

  getProfileData(){
    this._ProfileService.getProfileData().subscribe(res=>{
      this.profileData=res; 
      console.log(this.profileData);
      
      this.PanCardLink = "http://api.flexypay.in/public/uploads/user/pancard/"+this.profileData.profile_photo;
      if(this.profileData.profile_photo!='')
        this.UserProfilePhoto = 'http://api.flexypay.in/public/uploads/user/profilepic/'+this.profileData.profile_photo;
      else
        this.UserProfilePhoto = 'http://flexypay.in/assets/images/user.png';
      if(this.profileData.cover_photo!='')
        this.UserCoverPhoto = "http://api.flexypay.in/public/uploads/user/coverpic/" + this.profileData.cover_photo;
      else this.UserCoverPhoto = 'http://flexypay.in/assets/images/rp-bg.jpg';
    });
  }

  getCoverPhoto(){
    return 'http://api.flexypay.in/public/uploads/user/coverpic/14972468894889.gif';//+this.profileData.cover_photo;
  }

  redirectHome() {
    if (this.sendProfileResult.status == 1) this.router.navigate(['makepayments'])
  };

}
