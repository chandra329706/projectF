import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refer-a-friend',
  templateUrl: './refer-a-friend.component.html',
  styleUrls: ['./refer-a-friend.component.css']
})
export class ReferAFriendComponent implements OnInit {

  constructor() { }

  ReferalCode : any;
  UserStatus  :any;
  ShareData :any= {};
  ngOnInit() {
    
    this.ReferalCode = localStorage.getItem('referral_code');
    this.UserStatus = localStorage.getItem('UserStatus');
    this.ShareData = "{title:'Flexypay Referal Code', description:'Use referal code to get discount', img:' an image', via:'Flexypay', hashtags:'"+this.ReferalCode+"'}"
  }

}
