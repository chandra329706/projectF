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
      console.log('asdasdasd');
      this.IsLoggedIn = true;
      this._router.navigate(['/makepayments']);
    }
  }

}
