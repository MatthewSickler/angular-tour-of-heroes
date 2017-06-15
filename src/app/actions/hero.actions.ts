import { Action } from '@ngrx/store';
import {Hero} from './../heroes/hero';

export const SEARCH = "SEARCH";

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string){}
}

export type Actions = SearchAction;
