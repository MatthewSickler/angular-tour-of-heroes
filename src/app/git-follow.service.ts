import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class GitFollowService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getQueryFromURL(url: string): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }
}
