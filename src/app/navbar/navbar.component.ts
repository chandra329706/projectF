import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavBarService} from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[NavBarService]
})
export class NavbarComponent implements OnInit {

  constructor(private _router : Router, private _navBarService : NavBarService) { }

  dropdownOpened : any;

  ngOnInit() {
  }

  UserLogout(){
    localStorage.clear();    
    // this._router.navigate(['/']);  
    window.location.href='http://flexypay.in';
  }

}
