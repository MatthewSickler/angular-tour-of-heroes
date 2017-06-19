import {Hero} from './../heroes/hero';

import { createSelector } from 'reselect';

import * as heroActions from './../actions/hero.actions';

export interface State {
  heroes: Hero[];
  selectedHero: Hero;
};

export const initialState: State = {
  heroes: [],
  selectedHero: null
};

export function reducer(state = initialState, action: heroActions.Actions): State {
  switch(action.type) {
    case heroActions.SEARCH_ALL_COMPLETE:
      const heroes = action.payload;
      return Object.assign({}, state, {heroes: heroes});

    case heroActions.GET_SELECTED_HERO:
      const h = action.payload.heroes;
      const id = action.payload.id;
      for(let x = 0; x < h.length; x++) {
        if(+h[x].id === id) {
          return Object.assign({}, state, {selectedHero: h[x]});
        }
      }
      return state;

    case heroActions.SET_SELECTED_HERO:
      const hero = action.payload;
      return Object.assign({}, state, {selectedHero: hero});

    case heroActions.ADD_HERO_COMPLETE:
      const newHero = action.payload;
      return Object.assign({}, state, {heroes: state.heroes.concat([newHero])});

    case heroActions.DELETE_HERO_COMPLETE:
      const deleteId = +action.payload;
      for(let x = 0; x < state.heroes.length; x++) {
        if(+state.heroes[x].id === deleteId) {
          return Object.assign({}, state, {heroes: state.heroes.slice(0, x).concat(state.heroes.slice(x+1))});
        }
      }
      return state;

    default:
      return state;
  }
}

export const getAllHeroes = (state: State) => state.heroes;
export const getSelectedHero = (state: State) => state.selectedHero;
