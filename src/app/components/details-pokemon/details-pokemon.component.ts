import { Component } from '@angular/core';
import { ContactPokeApiService } from '../../tools/services/api/contact-poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-details-pokemon',
  standalone: false,

  templateUrl: './details-pokemon.component.html',
  styleUrl: './details-pokemon.component.scss'
})
export class DetailsPokemonComponent {

  idPokemon!: number;
  currentPage!: number;
  search!: boolean;
  pokemon!: Pokemon;
  messageErreur: string = "";

  constructor(private _contactPokeService: ContactPokeApiService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.idPokemon = _activatedRoute.snapshot.params["id"];

  }

  ngOnInit() {
    this._contactPokeService.RecupererPokemonViaId(this.idPokemon).subscribe({
      next: (data) => {
        this.pokemon = data;
      },
      error: (error) => {
        this.messageErreur = error.message;
      },
      complete: () => {
        console.log("Pokemon récupéré : ", this.pokemon);
      }
    })

    this._activatedRoute.queryParams.subscribe(params => {
      this.currentPage = parseInt(params["page"]);
      console.log("current page url", this.currentPage);

      this.search = params["search"];

    })

  }

  goBack() {
    if (!isNaN(this.currentPage)) {
      this._router.navigate(["liste-pokemon"], { queryParams: { page: this.currentPage } });
    }
    else if (this.search) {
      this._router.navigate(["recherche-pokemon"]);
    }

  }
}
