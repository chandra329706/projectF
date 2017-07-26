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
  ngOnInit() {
    this.UserName = localStorage.getItem('currentUserName');
    this.WalletBalance = localStorage.getItem('currentWalletBalance');
    if(localStorage.getItem('profile_photo')!='')
      this.profilePic = 'http://api.flexypay.in/public/uploads/user/profilepic/'+localStorage.getItem('profile_photo');
    else this.profilePic = 'http://flexypay.in/assets/images/user.png';
  }

}
