import { Component, OnInit } from '@angular/core';

import { Hero } from './heroes/hero';
import { HeroService } from './heroes/hero.service';
import { StorageService } from './storage.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));

    // console.log(this.storageService.getHeroes());
    // this.storageService.addHero({name: 'dash', id: 2});
    // console.log(this.storageService.getHeroes());
  }
}
