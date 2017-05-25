import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  private heroesUrl = 'https://localhost/shopbot/data/heroes/heroes_api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    let args: RequestOptionsArgs = {params: {search: term}};
    return this.http.get(this.heroesUrl + 'searchHeroesByName', args)
                    .map(response => {return response.json() as Hero[];});
  }
}
