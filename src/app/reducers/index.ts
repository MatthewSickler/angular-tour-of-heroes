import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';
import {heroMetaReducer} from './hero.meta-reducer';

export interface State {
  hero: fromHero.State
  router: fromRouter.RouterState;
}

import * as fromHero from './hero.reducer';

const reducers = {
  hero: heroMetaReducer(fromHero.reducer),
  router: fromRouter.routerReducer
};

export function reducer(state: any, action: any): ActionReducer<State> {
  return combineReducers(reducers)(state, action);
}

export const getHeroState = (state: State) => state.hero;
export const getAllHeroes = createSelector(getHeroState, fromHero.getAllHeroes);
export const getSelectedHero = createSelector(getHeroState, fromHero.getSelectedHero);
