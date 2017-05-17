import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})

export class HeroListComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  private selectedId: number;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => {this.heroes = heroes; return this.getSelectedHero();});
  }

  getSelectedHero(): void {
    if(!this.selectedId) {
      return;
    }

    for(let x = 0; x < this.heroes.length; x++) {
      if(this.heroes[x].id === this.selectedId) {
        this.selectedHero = this.heroes[x];
        return;
      }
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.selectedId = +params['id']);
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/hero', this.selectedHero.id, {source: 'heroes'}]);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {
      return;
    }

    this.heroService.create(name)
                    .then(hero => {
                      this.heroes.push(hero);
                      this.selectedHero = null;
                    });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
                    .then(() => {
                      this.heroes = this.heroes.filter(h => h !== hero);
                      if (this.selectedHero === hero) { this.selectedHero = null; }
                    });
  }
}
