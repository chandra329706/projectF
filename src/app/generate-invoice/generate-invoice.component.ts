import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css']
})
export class GenerateInvoiceComponent implements OnInit {

  mainData: any = {};
  dateData: any = {};
  from: any = {};
  to: any = {};
  invoice: any = {};
  UserStatus : any;
  productsList: any = [];
  sendData: any = {};
  today: Date = new Date();

  constructor() { }
  
  @ViewChild('pdfMaker') el: ElementRef;

  ngOnInit() { 
    this.addNewRow();
    this.mainData.sender = localStorage.getItem('currentUserName');
    // Date Module Start
    this.dateData.year='';
    this.dateData.month='';
    this.dateData.day='';
    this.dateData.getYears=[{'name':'Year','value':''}];
    this.dateData.getDays=[{'name':'Day','value':''}];
    this.dateData.getMonths=[{'name':'Month','value': ''},
                             {'name':'Jan', 'value': '1'},
                             {'name':'Feb', 'value': '2'},
                             {'name':'Mar', 'value': '3'},
                             {'name':'Apr', 'value': '4'},
                             {'name':'May', 'value': '5'},
                             {'name':'Jun', 'value': '6'},
                             {'name':'Jul', 'value': '7'},
                             {'name':'Aug', 'value': '8'},
                             {'name':'Sep', 'value': '9'},
                             {'name':'Oct', 'value': '10'},
                             {'name':'Nov', 'value': '11'},
                             {'name':'Dec', 'value': '12'},
                            ];
    this.getYears();
    // Date Module End
    this.mainData.payer="sender";
    this.UserStatus = localStorage.getItem('UserStatus');
    // this.mainData.date = 
  }

  // Date Functions Start
  getYears(){
    for (var temp=2000; temp<=2020; temp++) this.dateData.getYears.push({'name':temp,'value':temp});
  }

  getMonths(){
    if(this.dateData.month!='') this.getDays();
  }

  getDays(){
    this.dateData.getDays=[];
    var daysPerMonth=0;
    if(this.dateData.month=='Jan'||this.dateData.month=='Mar'||this.dateData.month=='May'||this.dateData.month=='Jul'||this.dateData.month=='Aug'||this.dateData.month=='Oct'||this.dateData.month=='Dec') {daysPerMonth = 31;}
    else if(this.dateData.month=='Feb')
      if(this.dateData.year%4 == 0) daysPerMonth = 29;
        else daysPerMonth = 28;
    else daysPerMonth = 30;
    // console.log('Year is'+this.dateData.year+", Month is "+this.dateData.month+", No of days is "+daysPerMonth);
    for(var temp=1; temp<=daysPerMonth; temp++) this.dateData.getDays.push({'name':temp,'value':temp});
  }
  createDate(){
    this.mainData.dateCombined = this.dateData.year+this.dateData.month+this.dateData.day;
  }
  // Date Functions End


  addNewRow(){
    this.mainData.grandTotal = 0;
    this.productsList.push({"total":"0","qty":"0","price":"0"});
    for(var i=0;i<this.productsList.length;i++){
      this.productsList[i].total = Number(this.productsList[i].qty)*Number(this.productsList[i].price);
      this.mainData.grandTotal = this.mainData.grandTotal+this.productsList[i].total;
      console.log("Grand Total is "+this.mainData.grandTotal);
    }

  }

  downloadData(){
    //For PDF Download
    var doc = new jsPDF();
    let options = { };
    doc.addHTML(this.el.nativeElement, 150, 180, options, () => {
      doc.save("Flexypay Invoice.pdf");
   });
  }


}