import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf'
import {RentReceiptService} from './rent-receipts.service'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-rent-receipts',
  templateUrl: './rent-receipts.component.html',
  styleUrls: ['./rent-receipts.component.css'],
  providers : [RentReceiptService]
})
export class RentReceiptsComponent implements OnInit {

  constructor(private _rentReceptService : RentReceiptService) { }

  UserStatus : any;
  Disabled : boolean = false;
  receipt: any = {}

  @ViewChild('pdfMaker') el: ElementRef;

  ngOnInit() {
    //this.UserStatus = localStorage.getItem('UserStatus');
    this._rentReceptService.getUserStatus().subscribe(Udata => {
      this.UserStatus = Udata.user_status;
      if(this.UserStatus){
        this.Disabled = true;
      }     
    })
  }

  downloadData(){
    //For PDF Download
    console.log(this.receipt);
    var doc = new jsPDF();
    let options = { };
    doc.addHTML(this.el.nativeElement, 0, 0, options, () => {
      doc.save("Rent Receipt.pdf");
   });
  }

}
