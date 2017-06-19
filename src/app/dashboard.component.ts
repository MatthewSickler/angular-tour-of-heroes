import { Component, OnInit } from '@angular/core';

import { Hero } from './heroes/hero';
import { HeroService } from './heroes/hero.service';
import { StorageService } from './storage.service';

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

  private selectedHeroSubscription;

  constructor(
    private heroService: HeroService,
    private storageService: StorageService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch({type: SET_DASHBOARD_STATE});

    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));

    this.selectedHeroSubscription = this.store.select(fromRoot.getSelectedHero).subscribe(hero => {console.log(hero);});
  }

  ngOnDestroy(): void {
    this.selectedHeroSubscription.unsubscribe();
  }
}
