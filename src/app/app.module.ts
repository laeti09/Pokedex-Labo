import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListePokemonComponent } from './components/liste-pokemon/liste-pokemon.component';
import { RecherchePokemonComponent } from './components/recherche-pokemon/recherche-pokemon.component';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/shared/home/home.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WeightPipe } from './tools/pipe-custom/weight.pipe';
import { HeightPipe } from './tools/pipe-custom/height.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListePokemonComponent,
    RecherchePokemonComponent,
    DetailsPokemonComponent,
    NavBarComponent,
    HomeComponent,
    WeightPipe,
    HeightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()) // => utilisation du module HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
