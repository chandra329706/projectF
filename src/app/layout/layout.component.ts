import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private _router : Router) { }

  IsLoggedIn : boolean = false;

  ngOnInit() {
    if(localStorage.getItem('currentUserId')){
      this.IsLoggedIn = true;
    }
    // else{
    //   window.location.href='http://flexypay.in/#/login';
    // }
  }

}
