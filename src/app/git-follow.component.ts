import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { GitFollowService } from './git-follow.service';

@Component ({
  selector: "git-follow",
  templateUrl: "./git-follow.component.html"
})

//Tutorial from: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
export class GitFollowComponent implements OnInit {
  gitURL: string = 'https://api.github.com/users';
  gitURLOffset: string = 'https://api.github.com/users?since=';
  userList: any[] = [];
  userListShow: any[] = [];

  //Called on button clicks
  refreshClickObs: Subject<any> = new Subject();
  clearUserClickObs: Subject<number> = new Subject();


  requestObs: Observable<any> = this.refreshClickObs.startWith('start').map(() => {
    this.userListShow = []
    let randomOffset = Math.floor(Math.random()*500);
    return this.gitURLOffset + randomOffset;
  });

  responseObs: Observable<any> = this.requestObs.flatMap((url: string) => this.gitFollowService.getQueryFromURL(url));

  newUserObs: Observable<any> = this.clearUserClickObs.startWith(-1).combineLatest(this.responseObs, (index, users) => {
    // let usersJSON = users.json();
    if(this.userListShow.length === 0) {
      this.userListShow[0] = users[Math.floor(Math.random()*users.length)];
      this.userListShow[1] = users[Math.floor(Math.random()*users.length)];
      this.userListShow[2] = users[Math.floor(Math.random()*users.length)];
    } else {
      this.userListShow[index] = users[Math.floor(Math.random()*users.length)];
    }

  });



  constructor(private gitFollowService: GitFollowService) {}

  ngOnInit(): void {
    this.newUserObs.subscribe();
  }


}
