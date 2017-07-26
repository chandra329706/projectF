import { Component, OnInit } from '@angular/core';
import {TransactionHistoryService} from './transaction-history.service';
import {TabFilterPipe} from './tab-filter.pipe';
let fileSaver = require('filesaver.js');

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
  providers : [TransactionHistoryService]
})
export class TransactionHistoryComponent implements OnInit {

  constructor(private _transactionHistoryService : TransactionHistoryService) { }

  TotalTransactionHistoryList : any = [];
  TabFilterText : any;
  RecievedPaymentsData : any = [];
  TransactionDetails :any = {};
  LoanRequestData : any = [];
  DownloadData : any;
  UserStatus  :any;

  ngOnInit() {
    this.allTransactionsHistoryList();
    this.UserStatus = localStorage.getItem('UserStatus');
    this._transactionHistoryService.getreceivedPaymnets().subscribe(PData =>{ this.RecievedPaymentsData = PData; console.log(this.RecievedPaymentsData)});
  }

  SearchTransactionType(transactionType : any){
    this.TabFilterText = transactionType;
  }

  allTransactionsHistoryList(){
      this._transactionHistoryService.getAllTransactionsList().subscribe(thData => this.TotalTransactionHistoryList = thData);
  }

  getTransactionDetails(transaction_id : any){
    this._transactionHistoryService.TransactionDetails(transaction_id).subscribe(tDetails =>{ 
      this.TransactionDetails = tDetails;
      if(this.TransactionDetails.status == 1){
        let tr_date = this.TransactionDetails.transaction_date.split(" ");
        this.TransactionDetails.transaction_date = tr_date[0];
      }      
    });
  }

  download_transaction(transaction_id : any){
    this._transactionHistoryService.download_transaction(transaction_id).subscribe(download => {
      let rawData = new Blob([download],{type: 'application/pdf'});
      fileSaver.saveAs(rawData, 'transaction.pdf');
    });
  }



}
