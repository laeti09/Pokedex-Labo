import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../../../models/pokemon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactPokeApiService {
  private _apiUrl: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private _httpClient: HttpClient) { }

  // CRUD

  //Récupèrer 20 pokemons
  RecupererPokemons(): Observable<Pokemon[]> {
    return this._httpClient.get<Pokemon[]>(this._apiUrl);
  }

  //Récupérer pokemons avec paramètres de pagination
  RecupererPokemonsPagination(startPosition: number, pokemonsCount: number): Observable<Pokemon[]> {
    return this._httpClient.get<Pokemon[]>(`${this._apiUrl}?offset=${startPosition}&limit=${pokemonsCount}`);
  }

  RecupererDernierePage(pagesCount: number, pokemonsCount: number): Observable<Pokemon[]> {
    return this._httpClient.get<Pokemon[]>(`${this._apiUrl}?offset=${(pagesCount - 1 * pokemonsCount)}&limit=${pokemonsCount}`);
  }

  //Récupérer un pokemon via un id
  RecupererPokemonViaId(id: number): Observable<Pokemon> {
    return this._httpClient.get<Pokemon>(`${this._apiUrl}/${id}`);
  }

  //Récupérer un pokemon via un nom
  RecupererPokemonViaNom(nom: string): Observable<Pokemon> {
    return this._httpClient.get<Pokemon>(`${this._apiUrl}/${nom}`);
  }

  RecupererTousLesPokemons(): Observable<Pokemon[]> {
    return this._httpClient.get<Pokemon[]>(`${this._apiUrl}?offset=0&limit=1304`);
  }

}
