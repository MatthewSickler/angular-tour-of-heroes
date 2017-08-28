import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/catch';

// import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { HeroEffects } from './hero.effects';
import {HeroService} from './../heroes/hero.service';
import { Observable } from 'rxjs/Observable';
import {ReplaySubject } from 'rxjs/ReplaySubject';
import * as heroActions from './../actions/hero.actions';
import {Hero} from './../heroes/hero';

describe('HeroEffects', () => {
  let newHero = {id: 3, name: "Three"} as Hero;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroEffects,
        provideMockActions(() => actions),
        {provide: HeroService, useValue: jasmine.createSpyObj('heroService', ['getHeroesObs', 'create', 'delete'])}
      ]
    });
  });

  function setup(serviceFunction: string, params?: {returnValue: any}) {
    const heroService = TestBed.get(HeroService);
    if(params) {
      heroService[serviceFunction].and.returnValue(params.returnValue);
    }

    return {
      heroEffects: TestBed.get(HeroEffects),
      heroService: heroService
    };
  }

  it('should call search all complete action', fakeAsync(() => {
    const hero1 = {id: 1, name: "One"} as Hero;
    const hero2 = {id: 2, name: "Two"} as Hero;
    const heroList = [hero1, hero2] as Hero[];
    actions = new ReplaySubject(1);

    const {heroEffects, heroService} = setup('getHeroesObs', {returnValue: Observable.of(heroList)});

    const expectedResult = new heroActions.SearchAllCompleteAction(heroList);
    actions.next(new heroActions.SearchAllAction());

    let result = null;
    heroEffects.search.subscribe(_result => result = _result);
    expect(result).toEqual(expectedResult);
  }));

  it('should call add complete action', fakeAsync(() => {
    actions = new ReplaySubject(1);
    const {heroEffects, heroService} = setup('create', {returnValue: new Observable((observer: any) => observer.next(newHero))});

    const expectedResult = new heroActions.AddHeroCompleteAction(newHero);
    actions.next(new heroActions.AddHeroAction("Three"));

    let result = null;
    heroEffects.add.subscribe(_result => result = _result);
    expect(result).toEqual(expectedResult);
  }));

  it('should trim spaces from hero name before calling service', fakeAsync(() => {
    actions = new ReplaySubject(1);
    const {heroEffects, heroService} = setup('create', {returnValue: new Observable((observer: any) => observer.next(newHero))});

    actions.next(new heroActions.AddHeroAction(" Spaces "));

    let result = null;
    heroEffects.add.subscribe(_result => result = _result);
    expect(heroService.create).toHaveBeenCalledWith("Spaces");
  }));

  it('should not call service if name is blank or only contains spaces', fakeAsync(() => {
    actions = new ReplaySubject(1);
    let heroEffects, heroService, result = null;

    ({heroEffects, heroService} = setup('create', {returnValue: new Observable((observer: any) => observer.next(newHero))}));
    heroEffects.add.subscribe(_result => result = _result);

    actions.next(new heroActions.AddHeroAction(""));
    expect(heroService.create).not.toHaveBeenCalled();

    actions.next(new heroActions.AddHeroAction("  "));
    expect(heroService.create).not.toHaveBeenCalled();

    actions.next(new heroActions.AddHeroAction("           "));
    expect(heroService.create).not.toHaveBeenCalled();
  }));

  it('should call delete complete action', fakeAsync(() => {
    actions = new ReplaySubject(1);
    const {heroEffects, heroService} = setup('delete', {returnValue: new Observable((observer: any) => observer.next(2))});

    const expectedResult = new heroActions.DeleteHeroCompleteAction(2);
    actions.next(new heroActions.DeleteHeroAction(2));

    let result = null;
    heroEffects.delete.subscribe(_result => result = _result);
    expect(result).toEqual(expectedResult);
  }));


});
