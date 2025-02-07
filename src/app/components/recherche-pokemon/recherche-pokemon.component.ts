import { Component } from '@angular/core';
import { ContactPokeApiService } from '../../tools/services/api/contact-poke-api.service';
import { Pokemon } from '../../models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-pokemon',
  standalone: false,

  templateUrl: './recherche-pokemon.component.html',
  styleUrl: './recherche-pokemon.component.scss'
})
export class RecherchePokemonComponent {
  pokemonsName: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  affichagePokemons: Pokemon[] = [];
  searchPokemon: string = "";
  messageErreur: string = "";

  constructor(private _contactPokeApi: ContactPokeApiService, private _router: Router) { }

  ngOnInit() {
    this._contactPokeApi.RecupererTousLesPokemons().subscribe({
      next: (data: any) => {
        this.pokemonsName = data.results;
        console.log(this.pokemonsName);

        //Récupére chaque URL et appelle l'API avec cette URL pour récupérer les détails
        for (let pokemon of this.pokemonsName) {
          //Contacte l'API
          this._contactPokeApi.RecupererPokemonViaNom(pokemon.name).subscribe({
            next: (data: any) => {
              this.pokemons.push(data);
            },
            error: (error) => {
              this.messageErreur = error.message;
            },
            complete: () => {
              console.log("Récupération terminée");
              console.log(this.pokemons);
            },
          })
        }

      },
      error: (error) => {
        this.messageErreur = error.message;
      },
      complete: () => {
        console.log("Récupération terminée");
        console.log(this.pokemons);
      },
    })
  }

  search(): void {
    this.affichagePokemons = this.pokemons.filter(pokemon => pokemon.name.startsWith(this.searchPokemon.trim().toLowerCase()));
  }

  goToPokemonDetails(id: number): void {
    this._router.navigate(["details-pokemon", id],{queryParams: {search: true}});
  }
}
