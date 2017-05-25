import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'https://localhost/shopbot/data/heroes/heroes_api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl + 'getAllHeroes')
              .toPromise()
              .then(response => {return response.json() as Hero[];})
              .catch(this.handleError);
  }

  getHeroesObs(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl + 'getAllHeroes').map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero> {
    let args: RequestOptionsArgs = {params: {id: id}};
    return this.http.get(this.heroesUrl + 'getHeroById', args)
              .toPromise()
              .then(response => response.json() as Hero)
              .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    let body = {data: hero, id: hero.id}
    return this.http.put(this.heroesUrl + 'updateHero', body, this.headers)
              .toPromise()
              .then(() => hero)
              .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    let body = {data: {name: name}};
    return this.http.post(this.heroesUrl + 'addHero', body, this.headers)
              .toPromise()
              .then(res => res.json() as Hero)
              .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(this.heroesUrl + `deleteHero/${id}`)
              .toPromise()
              .then(() => null)
              .catch(this.handleError);
  }
}
