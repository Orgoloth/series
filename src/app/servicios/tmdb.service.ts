import { FirestoreService } from './firestore.service';
import { Observable, of } from 'rxjs';
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

  private busqueda: any[] = [];
  private seguimientos;

  constructor(private http: HttpClient, private firestore: FirestoreService) {}

  public getBusqueda(): Observable<any[]> {
    return of(this.busqueda);
  }

  buscarSeries(termino: string, pagina: number = 1, busqueda?: any[]) {
    this.params = this.params.set('query', termino);
    this.params = this.params.set('page', pagina.toString());

    this.http
      .get(`${this.baseUrl}/search/tv`, { params: this.params })
      .subscribe((data) => {
        busqueda === undefined
          ? (busqueda = data['results'])
          : (busqueda = busqueda.concat(data['results']));

        if (data['page'] <= data['total_pages']) {
          this.buscarSeries(termino, data['page'] + 1, busqueda);
        } else {
          busqueda.sort((a, b) => b.popularity - a.popularity);
          this.busqueda = busqueda;
          this.rellenarSeguimientos();
        }
      });
  }

  rellenarSeguimientos() {
    this.firestore.Series.forEach((data) => {
      data.forEach((serieSeguimiento) => {
        const encontrado = this.busqueda.find(
          (item) =>
            item['id'].toString() === serieSeguimiento['idSerie'].toString()
        )
        if (encontrado) {
          encontrado['siguiendo'] = serieSeguimiento['siguiendo'];
        }
      });
    });
  }
}
