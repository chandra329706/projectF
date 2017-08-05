import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  UserName : any;
  WalletBalance : any;
  profilePic: any;
  imageName: any;
  ngOnInit() {
    this.UserName = localStorage.getItem('currentUserName');
    this.WalletBalance = localStorage.getItem('currentWalletBalance');
    console.log('The profile pic photo value is '+localStorage.getItem('profile_photo'));
    console.log(localStorage.getItem('profile_photo'));
    this.imageName = localStorage.getItem('profile_photo');
    if(this.imageName!=null&&this.imageName!='')
      { 
        console.log("came into the if loop");
        this.profilePic = 'http://api.flexypay.in/public/uploads/user/profilepic/'+localStorage.getItem('profile_photo');
      }
    else {this.profilePic = 'http://flexypay.in/assets/images/user.png';console.log('came into the else part');}
  }

}
