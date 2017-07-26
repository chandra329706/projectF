import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css']
})
export class GenerateInvoiceComponent implements OnInit {

  mainData: any = {};
  from: any = {};
  to: any = {};
  invoice: any = {};
  UserStatus : any;
  productsList: any = [{}];
  sendData: any = {};

  constructor() { }
  
  @ViewChild('pdfMaker') el: ElementRef;

  ngOnInit() {
    this.mainData.payer="sender";
    this.UserStatus = localStorage.getItem('UserStatus');
  }

  addNewRow(){
    this.productsList.push({});
  }

  downloadData(){
    console.log('from data');
    console.log(this.from);
    console.log('to data');
    console.log(this.to);
    console.log('main data');
    console.log(this.mainData);
    console.log(this.productsList);

    //For PDF Download
    var doc = new jsPDF();
    let options = { };
    doc.addHTML(this.el.nativeElement, 0, 0, options, () => {
      doc.save("Flexypay Invoice.pdf");
   });
  }


}