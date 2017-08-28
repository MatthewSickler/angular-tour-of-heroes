import { ComponentFixture, TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Router } from '@angular/router';

import {HeroListComponent} from './hero-list.component';
import {HeroService} from './hero.service';

import { Action, Store, StoreModule, combineReducers } from "@ngrx/store";
import { Subject } from "rxjs/Subject";
import {Observable} from 'rxjs/Observable';

import * as heroActions from './../actions/hero.actions';
import {reducers} from './../reducers';
import {SET_LIST_STATE} from './../reducers/hero.meta-reducer';
import * as fromRoot from './../reducers';

import 'rxjs/add/operator/takeUntil';

describe('Hero List Real Store', () => {
  let comp:    HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let store;
  let storeSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [
        {provide: Store, useValue: StoreModule.forRoot(reducers)},
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {provide: Router, useValue: Router}
      ]
    });

    fixture = TestBed.createComponent(HeroListComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('#titleFromClassVar'));
    el = de.nativeElement;
    store = fixture.debugElement.injector.get(Store);

    store.dispatch(new heroActions.SearchAllCompleteAction([{id: 1, name: "One"}, {id: 2, name: "Two"}]));
    store.dispatch(new heroActions.SetSelectedHeroAction({id: 2, name: "Two"}));

    storeSpy = spyOn(store, 'dispatch').and.callThrough();
  })

  it('should have a class variable', () => {
    expect(comp.title).toEqual('Original Title');
  });

  it('should have a starting hero list', () => {
    let heroList;
    store.select(fromRoot.getAllHeroes).subscribe(heroes => heroList = heroes);
    expect(heroList.length).toEqual(2);
  });

  it('should have a page title', () => {
    expect(el.textContent).toEqual('Original Title');
  });

  it('should dispatch add hero on button press', () => {
    let inputEl = fixture.debugElement.query(By.css('#heroName')).nativeElement, button = fixture.debugElement.query(By.css('#addHero'));

    expect(storeSpy).not.toHaveBeenCalledWith(new heroActions.AddHeroAction(''));
    button.triggerEventHandler('click', null);
    expect(storeSpy).toHaveBeenCalledWith(new heroActions.AddHeroAction(''));

    inputEl.value = 'test';
    expect(storeSpy).not.toHaveBeenCalledWith(new heroActions.AddHeroAction('test'));
    button.triggerEventHandler('click', null);
    expect(storeSpy).toHaveBeenCalledWith(new heroActions.AddHeroAction('test'));
  });

  it('should clear input after adding hero', () => {
    let inputEl = fixture.debugElement.query(By.css('#heroName')).nativeElement, button = fixture.debugElement.query(By.css('#addHero'));

    inputEl.value = 'test';
    button.triggerEventHandler('click', null);
    expect(inputEl.value).toEqual('');
  });

});
