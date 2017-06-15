import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

export interface State {
  hero: fromHero.State
  router: fromRouter.RouterState;
}

import * as fromHero from './hero.reducer';

const reducers = {
  hero: fromHero.reducer,
  router: fromRouter.routerReducer
};

export function reducer(state: any, action: any): ActionReducer<State> {
  return combineReducers(reducers)(state, action);
}

export const getHeroState = (state: State) => {console.log(state); return state.hero;};
export const getAllHeroes = createSelector(getHeroState, fromHero.getAllHeroes);
