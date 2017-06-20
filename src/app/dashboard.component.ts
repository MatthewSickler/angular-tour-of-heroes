import { Component, OnInit } from '@angular/core';

import { Hero } from './heroes/hero';
import { HeroService } from './heroes/hero.service';
import { StorageService } from './storage.service';

import {Subject} from 'rxjs/Subject';

import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import {SET_DASHBOARD_STATE} from './reducers/hero.meta-reducer';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private heroService: HeroService,
    private storageService: StorageService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch({type: SET_DASHBOARD_STATE});

    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));

    this.store.select(fromRoot.getSelectedHero).takeUntil(this.ngUnsubscribe).subscribe(hero => {console.log(hero);});
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
