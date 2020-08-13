import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { TmdbService } from 'src/app/servicios/tmdb.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  idSerie: number;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  results: any[] = [];
  termino: FormControl = new FormControl('');
  pagina: number;
  totalPaginas: number;
  contador: number;

  enSeguimientoColeccion: AngularFirestoreCollection<Item>;
  enSeguimiento: Observable<Item[]>;

  prueba: Item[] = [];

  constructor(private tmdb: TmdbService, private firestore: AngularFirestore) {
    // Traemos las series que están en seguimiento
    this.enSeguimientoColeccion = this.firestore.collection<Item>(
      'seguimiento'
    );
    this.enSeguimiento = this.enSeguimientoColeccion.valueChanges();

    // Suscribimos a los cambios en el termino de búsqueda:
    this.termino.valueChanges.subscribe((data) => {
      if (data.length > 3) {
        this.buscar();
      }
    });
  }

  ngOnInit(): void {}

  buscar = (pagina: number = 1) => {
    console.log('Buscando: ', this.termino.value, pagina);
    if (pagina === 1) {
      console.log('Vaciando');
      this.results = [];
    }
    this.tmdb.searchTv(this.termino.value, pagina).subscribe({
      next: (data) => {
        if (data) {
          this.results = [...this.results, ...data['results']];
          this.pagina = data['page'];
          this.totalPaginas = data['total_pages'];
        } else {
          console.log('Sin resultados');
        }
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => {
        if (this.pagina < this.totalPaginas) {
          this.buscar(this.pagina + 1);
        }
        this.ordenarResultados();
        console.log('Finalizada ronda de datos', this.pagina);
      },
    });
  };

  ordenarResultados() {
    this.results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
  }

  seguimiento(idSerie: number) {
    console.log(idSerie);

    // Comprobamos si en la lista ya está el id:
    this.enSeguimiento.subscribe((data: Item[]) => {
      if (data.filter((item) => item.idSerie === idSerie).length == 0) {
        this.enSeguimientoColeccion.add({ idSerie });
      } else {
        console.log(`${idSerie} ya existe`);
      }
    });
  }
}
