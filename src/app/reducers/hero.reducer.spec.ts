import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { Action } from '@ngrx/store';

import { heroReducer, State } from './hero.reducer';
import * as heroActions from './../actions/hero.actions';

describe('HeroReducer', () => {
  let testState: State;
  let testAction: heroActions.Actions;

  beforeEach(() => {
    testState = {
      heroes: [{id: 1, name: "One"}, {id: 2, name: "Two"}],
      selectedHero: {id: 2, name: "Two"}
    };
  });

  it('should get selected hero', () => {
    testAction = new heroActions.GetSelectedHeroAction({id: testState.heroes[0].id});

    testState = heroReducer(testState, testAction);

    expect(testState.selectedHero).toBe(testState.heroes[0]);

    testAction = new heroActions.GetSelectedHeroAction({id: testState.heroes[1].id});

    testState = heroReducer(testState, testAction);

    expect(testState.selectedHero).toBe(testState.heroes[1]);
  });

  it('should set selected hero to null if not found', () => {
    testAction = new heroActions.GetSelectedHeroAction({id: -1});

    testState = heroReducer(testState, testAction);

    expect(testState.selectedHero).toBeNull();
  });

  it('should remove deleted hero from local data', () => {
    testAction = new heroActions.DeleteHeroCompleteAction(1);

    testState = heroReducer(testState, testAction);

    expect(testState.heroes[0].id).toEqual(2);
    expect(testState.heroes.length).toEqual(1);
  })

})
