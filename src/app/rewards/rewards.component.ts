import { Component, OnInit } from '@angular/core';
import { RewardsService } from './rewards.service';

@Component({
    selector: 'rewards-component',
    templateUrl: './rewards.template.html',
    providers: [RewardsService]
})

export class RewardsComponent implements OnInit {

    rewardsList: any = [];
    UserStatus: any;
    
    constructor(private _rewardsService: RewardsService){}

    ngOnInit(){
        this.getRewardsList();
        this.UserStatus =  localStorage.getItem('UserStatus');
    }

    getRewardsList(){
        this._rewardsService.getRewardsList().subscribe(res=>{this.rewardsList = res.data; console.log(this.rewardsList);console.log('asdfasdadsfasdfa');})
    }

}
