import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HeroesModule } from './heroes/heroes.module';

import { StorageService } from './storage.service';
import { GitFollowService } from './git-follow.service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { ObservablesComponent } from './observables.component';
import { GitFollowComponent } from './git-follow.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import {reducers} from './reducers';
import {HeroEffects} from './effects/hero.effects';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ObservablesComponent, GitFollowComponent, PageNotFoundComponent],
  imports: [BrowserModule, FormsModule, HeroesModule, AppRoutingModule, HttpModule,
    StoreModule.forRoot(reducers), StoreRouterConnectingModule, EffectsModule.forRoot([HeroEffects])],
  bootstrap: [AppComponent],
  providers: [StorageService, GitFollowService]
})

export class AppModule { }
