import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { HeroService } from './hero.service';

@NgModule({
  declarations: [AppComponent, HeroesComponent, HeroDetailComponent, DashboardComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [HeroService]
})

export class AppModule { }
