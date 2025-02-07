import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { ContactPokeApiService } from '../../tools/services/api/contact-poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-liste-pokemon',
  standalone: false,

  templateUrl: './liste-pokemon.component.html',
  styleUrl: './liste-pokemon.component.scss'
})
export class ListePokemonComponent {
  pokemonsName: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  messageErreur: string = "";
  nbrPokemons!: number;
  pokemonPageCount: number = 10; //Nombre de Pokemon sur une page
  pagesCount!: number; //Nombre de pages total (dépend du nombre de Pokemon)
  currentPage: number = 1; //Page courante
  previousPageUrl!: string;
  nextPageUrl!: string;
  firstPageUrl!: string;

  constructor(private _contactPokeApi: ContactPokeApiService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  recupererParametresUrl(url: string): number[] {
    let parameters: number[] = [];
    let parametersUrl: string = url.slice(url.indexOf("?"));
    console.log(parametersUrl);
    parameters[0] = parseInt(parametersUrl.slice((parametersUrl.indexOf("offset=") + "offset=".length), parametersUrl.indexOf("&")));
    console.log(parameters[0]);
    parameters[1] = parseInt(parametersUrl.slice(parametersUrl.indexOf("limit=") + "limit=".length));
    console.log(parameters[1]);

    return parameters;
  }

  recupererPokemons(urlPagination: string) {
    this.pokemons = [];
    this.pokemonsName = [];
    const [offset, limit] = this.recupererParametresUrl(urlPagination);

    this._contactPokeApi.RecupererPokemonsPagination(offset, limit).subscribe({
      next: (data: any) => {
        this.nextPageUrl = data.next;
        this.previousPageUrl = data.previous;
        this.pokemonsName = data.results;
        this.nbrPokemons = data.count;


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
              console.log("Récupération des détails du pokemon terminée");
              //Trier la liste des Pokemons
              this.pokemons = this.pokemons.sort((a, b) => a.id - b.id);
            },
          })
        }

      },
      error: (error) => {
        this.messageErreur = error.message;
      },
      complete: () => {
        console.log("Récupération terminée");
        this.pagesCount = Math.ceil(this.nbrPokemons / this.pokemonPageCount);

      },
    })
  }


  ngOnInit(): void {

    this.firstPageUrl = `?offset=0&limit=${this.pokemonPageCount}`;


    this._activatedRoute.queryParams.subscribe(params => {
      if (!isNaN(parseInt(params["page"])) && parseInt(params["page"]) <= 300/*&& parseInt(params["page"]) <= this.pagesCount*/) {
        this.currentPage = parseInt(params["page"]);
        console.warn("num page : ", params["page"]);
        this.goToPage(this.currentPage);
      }
      else {
        this.recupererPokemons(this.firstPageUrl);
        console.log(this.pagesCount);
      }
    })

  }

  getDetailsPokemon(id: number) {
    if (id) {
      this._router.navigate(["details-pokemon", id], { queryParams: { page: this.currentPage } });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      console.log("Previous Page Button");
      this.currentPage--;
      this.recupererPokemons(this.previousPageUrl);
    }
  }

  nextPage() {
    if (this.currentPage < this.pagesCount) {
      console.log("Next Page Button");
      this.currentPage++;
      this.recupererPokemons(this.nextPageUrl);
    }
  }

  goToFirstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.recupererPokemons(this.firstPageUrl);
    }
  }

  goToLastPage() {
    if (this.currentPage < this.pagesCount) {
      this.currentPage = this.pagesCount;
      this.recupererPokemons(`?offset=${(this.pagesCount - 1) * this.pokemonPageCount}?limit=${this.pokemonPageCount}`);
    }
  }

  goToPage(pageNumber: number) {
    this.recupererPokemons(`?offset=${(pageNumber - 1) * this.pokemonPageCount}?limit=${this.pokemonPageCount}`);
  }


}
