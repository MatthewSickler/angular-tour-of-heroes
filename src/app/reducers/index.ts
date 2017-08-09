import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

export interface State {
  hero: fromHero.State
  router: fromRouter.RouterReducerState;
}

import * as fromHero from './hero.reducer';

export const reducers = {
  hero: fromHero.reducer,
  router: fromRouter.routerReducer
};

export function getHeroState(state: State){return state.hero;};
export const getAllHeroes = createSelector(getHeroState, fromHero.getAllHeroes);
export const getSelectedHero = createSelector(getHeroState, fromHero.getSelectedHero);
