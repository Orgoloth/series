import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/servicios/tmdb.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  results: any[] = [];
  pagina: number = 1;
  totalPaginas: number = 2;
  contador: number = 0;

  myObserver = {
    next: (data) => {
      console.log(data);
      this.results = [...this.results, ...data['results']];
      this.pagina = data['page'];
      this.totalPaginas = data['total_pages'];
    },
    error: (err) => console.error('Observer got an error: ' + err),
    complete: () => this.ordenarResultados(),
  };

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.traerResultados();
  }

  traerResultados() {
    do {
      this.tmdb.searchTv('dark', ++this.contador).subscribe(this.myObserver);
    } while (this.contador < 10 && this.contador <= this.totalPaginas);
  }

  ordenarResultados() {
    this.results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
  }
}
