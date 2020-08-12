import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/servicios/tmdb.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  results: any[] = [];
  pagina: number;
  totalPaginas: number;
  contador: number;

  myObserver = {
    next: (data) => {
      this.results = [...this.results, ...data['results']];
      this.pagina = data['page'];
      this.totalPaginas = data['total_pages'];
    },
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => {
      this.ordenarResultados();
    },
  };

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
    if (termino.length > 3) {
      this.results = [];
      this.contador = 0;
      this.totalPaginas = 100;
      do {
        this.tmdb.searchTv(termino, ++this.contador).subscribe(this.myObserver);
      } while (this.contador < 100 || this.contador > this.totalPaginas);
    }
  }

  seguimiento(id: number) {
    console.log(id);
  }

  ordenarResultados() {
    this.results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
  }
}
