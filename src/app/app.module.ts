import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
  declarations: [AppComponent, HeroDetailComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent]
})

export class AppModule { }
