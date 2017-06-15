import {Hero} from './../heroes/hero';

import { createSelector } from 'reselect';

import * as heroActions from './../actions/hero.actions';

export interface State {
  heroes: Hero[];
};

const initialState: State = {
  heroes: [{id: -1, name: "This is the initial state for hero list"}]
};

export function reducer(state = initialState, action: heroActions.Actions): State {
  switch(action.type) {
    case heroActions.SEARCH:
      console.log("Action Detected");
      return state;
    default:
      return state;
  }
}

export const getAllHeroes = (state: State) => {console.log(state); return state.heroes;};
