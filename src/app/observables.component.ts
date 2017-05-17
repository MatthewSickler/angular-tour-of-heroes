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

  constructor (
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    console.log("Output from o:");
    this.o.subscribe(val => console.log(val));
    this.o.subscribe(val => console.log(val));

    console.log("Output from getHeroes");
    this.heroList = this.heroService.getHeroesObs();
    console.log("The observable: ");
    console.log(this.heroList);
    console.log("Actually get the data:");
    this.heroList.subscribe((heroes: Hero[]) => {
      console.log(heroes);
    })
  }
}
