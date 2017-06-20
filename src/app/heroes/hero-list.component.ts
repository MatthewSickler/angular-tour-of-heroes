import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import { Store } from '@ngrx/store';
import * as fromRoot from './../reducers';
import * as heroActions from './../actions/hero.actions';
import {SET_LIST_STATE} from './../reducers/hero.meta-reducer';


@Component({
  selector: 'my-heroes',
  templateUrl: 'hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})

export class HeroListComponent implements OnInit {
  selectedHero: Hero;
  heroesFromStore: Observable<Hero[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private heroService: HeroService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  getHeroes(): void {
    this.store.dispatch(new heroActions.SearchAllAction());
  }

  ngOnInit(): void {
    this.store.dispatch({type: SET_LIST_STATE});
    this.heroesFromStore = this.store.select(fromRoot.getAllHeroes);
    this.heroesFromStore.takeUntil(this.ngUnsubscribe).subscribe(heroes => this.store.dispatch(new heroActions.GetSelectedHeroAction({heroes: heroes, id: this.selectedHero ? this.selectedHero.id : null})));

    this.store.select(fromRoot.getSelectedHero).takeUntil(this.ngUnsubscribe).subscribe(hero => {console.log(hero); this.selectedHero = hero;});

    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelect(hero: Hero): void {
    this.store.dispatch(new heroActions.SetSelectedHeroAction(hero));
  }

  gotoDetail(): void {
    this.router.navigate(['/hero', this.selectedHero.id, {source: 'heroes'}]);
  }

  add(name: string): void {
    this.store.dispatch(new heroActions.AddHeroAction(name));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new heroActions.DeleteHeroAction(hero.id));
  }
}
