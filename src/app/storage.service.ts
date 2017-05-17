import { Injectable } from '@angular/core';

import { Hero } from './heroes/hero';

@Injectable()
export class StorageService {
  private heroes: Hero[] = [];

  getHeroes(): Hero[] {
    return this.heroes;
  }

  addHero(hero: Hero): void {
    this.heroes.push(hero);
  }

}
