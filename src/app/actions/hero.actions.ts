import { Action } from '@ngrx/store';
import {Hero} from './../heroes/hero';

export const SEARCH_ALL = "SEARCH_ALL";
export const SEARCH_ALL_COMPLETE = "SEARCH_ALL_COMPLETE";
export const GET_SELECTED_HERO = "GET_SELECTED_HERO";
export const SET_SELECTED_HERO = "SET_SELECTED_HERO";
export const ADD_HERO = "ADD_HERO";
export const ADD_HERO_COMPLETE = "ADD_HERO_COMPLETE";
export const DELETE_HERO = "DELETE_HERO";
export const DELETE_HERO_COMPLETE = "DELETE_HERO_COMPLETE";

export class SearchAllAction implements Action {
  readonly type = SEARCH_ALL;

  constructor(){}
}

export class SearchAllCompleteAction implements Action {
  readonly type = SEARCH_ALL_COMPLETE;

  constructor(public payload: Hero[]){}
}

export class GetSelectedHeroAction implements Action {
  readonly type = GET_SELECTED_HERO;

  constructor(public payload: any){}
}

export class SetSelectedHeroAction implements Action {
  readonly type = SET_SELECTED_HERO;

  constructor(public payload: Hero){}
}

export class AddHeroAction implements Action {
  readonly type = ADD_HERO;

  constructor(public payload: string){}
}

export class AddHeroCompleteAction implements Action {
  readonly type = ADD_HERO_COMPLETE;

  constructor(public payload: Hero){}
}

export class DeleteHeroAction implements Action {
  readonly type = DELETE_HERO;

  constructor(public payload: number){}
}

export class DeleteHeroCompleteAction implements Action {
  readonly type = DELETE_HERO_COMPLETE;

  constructor(public payload: number){}
}

export type Actions = SearchAllAction | SearchAllCompleteAction | GetSelectedHeroAction | SetSelectedHeroAction | AddHeroAction | AddHeroCompleteAction
                      | DeleteHeroAction | DeleteHeroCompleteAction;
