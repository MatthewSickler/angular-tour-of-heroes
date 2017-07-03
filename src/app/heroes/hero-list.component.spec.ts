import { ComponentFixture, TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Router } from '@angular/router';

import {HeroListComponent} from './hero-list.component';
import {HeroService} from './hero.service';

import { Action, Store } from "@ngrx/store";
import { Subject } from "rxjs/Subject";
import {Observable} from 'rxjs/Observable';

import * as heroActions from './../actions/hero.actions';
import {SET_LIST_STATE} from './../reducers/hero.meta-reducer';

import 'rxjs/add/operator/takeUntil';

describe('Hero List', () => {
  let comp:    HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  const obs = new Observable((observer:any) => {});
  let dispatchSpy;

  beforeEach(() => {
    dispatchSpy = jasmine.createSpy('dispatch');
    var storeSpyClass = class {dispatch = dispatchSpy; select = () => {return obs;}};
    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {provide: Store, useClass: storeSpyClass},
        {provide: Router, useValue: Router}
      ]
    });

    fixture = TestBed.createComponent(HeroListComponent);

    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('#titleFromClassVar'));
    el = de.nativeElement;
  })

  it('should have a class variable', () => {
    expect(comp.title).toEqual('Original Title');
  });

  it('should have a page title', () => {
    expect(el.textContent).toEqual('Original Title');
  });

  it('should display original title', () => {
    // Hooray! No `fixture.detectChanges()` needed
    expect(el.textContent).toContain(comp.title);
  });

  it('should still see original title after comp.title change', () => {
    const oldTitle = comp.title;
    comp.title = 'Test Title';
    // Displayed title is old because Angular didn't hear the change :(
    expect(el.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); // detect changes explicitly
    expect(el.textContent).toContain(comp.title);
  });

  it('should dispatch to set list state', () => {
    expect(dispatchSpy).toHaveBeenCalledWith({type: SET_LIST_STATE});
  });

  it('should dispatch add hero on button press', () => {
    let inputEl = fixture.debugElement.query(By.css('#heroName')).nativeElement, button = fixture.debugElement.query(By.css('#addHero'));

    expect(dispatchSpy).not.toHaveBeenCalledWith(new heroActions.AddHeroAction(''));
    button.triggerEventHandler('click', null);
    expect(dispatchSpy).toHaveBeenCalledWith(new heroActions.AddHeroAction(''));

    inputEl.value = 'test';
    button.triggerEventHandler('click', null);
    expect(dispatchSpy).toHaveBeenCalledWith(new heroActions.AddHeroAction('test'));
  });

  it('should clear input after adding hero', () => {
    let inputEl = fixture.debugElement.query(By.css('#heroName')).nativeElement, button = fixture.debugElement.query(By.css('#addHero'));

    inputEl.value = 'test';
    button.triggerEventHandler('click', null);
    expect(inputEl.value).toEqual('');
  });

});
