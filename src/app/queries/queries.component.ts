import { Component, OnInit } from '@angular/core';
import {QueryService} from './queries.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
  providers : [QueryService]
})
export class QueriesComponent implements OnInit {


  constructor(private queryService : QueryService) { }

  UserStatus : any;
  QuerySubmitResult : any = {'status':''};

  ngOnInit() {
    this.UserStatus = localStorage.getItem('UserStatus');
  }

  SubmitQuery(FormFields : NgForm){
       this.queryService.submitUserQuery(FormFields.value).subscribe(Qdata =>{ 
        this.QuerySubmitResult = Qdata;
        if(this.QuerySubmitResult.status==1){
          FormFields.reset();
          setInterval(()=> { this.QuerySubmitResult.status=''; },4000);
        }
      });
  }

}
