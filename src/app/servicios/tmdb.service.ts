import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey: string = 'f85cd9fd3e4ded84aabfef97d619f768';
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private params: HttpParams = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language', 'es');

  // https://api.themoviedb.org/3/search/tv?api_key=f85cd9fd3e4ded84aabfef97d619f768&language=es&query=breaking

  constructor(private http: HttpClient) {}

  searchTv(termino: string, pagina: number) {
    this.params = this.params.set('query', termino);
    this.params = this.params.set('page', pagina.toString());
    // console.log('Buscando: ', termino, pagina.toString(), this.params);

    return this.http.get(`${this.baseUrl}/search/tv`, { params: this.params });
  }
}
