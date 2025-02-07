import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';
import { ListePokemonComponent } from './components/liste-pokemon/liste-pokemon.component';
import { RecherchePokemonComponent } from './components/recherche-pokemon/recherche-pokemon.component';
import { HomeComponent } from './components/shared/home/home.component';

const routes: Routes = [
  //Redirection automatique quand l'URL est vide
  { path: "", pathMatch: "full", component: HomeComponent },

  { path: "details-pokemon/:id", component: DetailsPokemonComponent },
  { path: "liste-pokemon", component: ListePokemonComponent },
  { path: "recherche-pokemon", component: RecherchePokemonComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
