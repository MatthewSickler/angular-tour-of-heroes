import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HeroService } from './heroes/hero.service';

import { Hero } from './heroes/hero';

@Component({
  selector: 'my-observables',
  templateUrl: './observables.component.html'
})

export class ObservablesComponent implements OnInit {
  o: Observable<string> = new Observable((observer:any) => {
    observer.next('string 1');
    observer.next('string 2');
  });
  heroList: Observable<Hero[]>;
  s: Subject<number> = new Subject();
  multiClick: Subject<Event> = new Subject();
  clickCount: number = 0;

  constructor (
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    // console.log("Output from o:");
    // console.log(this.o);
    // this.o.subscribe(val => console.log(val));
    // this.o.subscribe(val => console.log(val));

    // console.log("Output from getHeroes");
    // this.heroList = this.heroService.getHeroesObs();
    // console.log("The observable: ");
    // console.log(this.heroList);
    // console.log("Actually get the data:");
    // this.heroList.subscribe((heroes: Hero[]) => {
    //   console.log(heroes);
    // })

    // console.log("Subject: ");
    // this.s.next(1);
    // this.s.next(2);
    // this.s.next(3);
    //
    // this.s.subscribe(num => console.log(num));
    // this.s.next(4);

    //https://camo.githubusercontent.com/995c301de2f566db10748042a5a67cc5d9ac45d9/687474703a2f2f692e696d6775722e636f6d2f484d47574e4f352e706e67
    this.multiClick.bufferWhen(() => this.multiClick.debounceTime(250)).map(arr => arr.length).subscribe(length => this.clickCount = length);
  }
}
