import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';

import * as heroActions from './../actions/hero.actions';
import { HeroService } from './../heroes/hero.service';

@Injectable()
export class HeroEffects {
  constructor(private actions: Actions, private heroService: HeroService){}

  @Effect()
  search: Observable<Action> = this.actions.ofType(heroActions.SEARCH_ALL)
                                            .switchMap(a => this.heroService.getHeroesObs().map(heroes => new heroActions.SearchAllCompleteAction(heroes))
                                                                                     .catch(() => of(new heroActions.SearchAllCompleteAction([]))));

  @Effect()
  add: Observable<Action> = this.actions.ofType(heroActions.ADD_HERO)
                                        .map(toPayload)
                                        .map(name => name.trim())
                                        .skipWhile(name => !name)
                                        .switchMap(name => this.heroService.create(name).map(hero => new heroActions.AddHeroCompleteAction(hero)));

  @Effect()
  delete: Observable<Action> = this.actions.ofType(heroActions.DELETE_HERO)
                                            .map(toPayload)
                                            .switchMap(id => this.heroService.delete(id).map(id => new heroActions.DeleteHeroCompleteAction(id)));
}
