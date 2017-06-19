import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  private source: string;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    //(+) converts string to integer
    this.route.params.switchMap((params: Params) => {this.source = params['source']; return this.heroService.getHero(+params['id']);}).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    let heroId = this.hero ? this.hero.id : null;

    if(this.source) {
      this.router.navigate(['/' + this.source]);
    } else {
      this.location.back();
    }
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }
}
