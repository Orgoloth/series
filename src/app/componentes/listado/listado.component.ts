import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TmdbService } from 'src/app/servicios/tmdb.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  termino: FormControl = new FormControl('');
  private timer;

  constructor(public tmdb: TmdbService, private firestore: FirestoreService) {}

  ngOnInit(): void {
    this.termino.valueChanges.subscribe((data) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.buscarSeries, 2000);
    });
  }

  buscarSeries = () => {
    this.tmdb.buscarSeries(this.termino.value);
  };

  cambiarSeguimiento(idSerie) {
    this.firestore.cambiarSeguimiento(idSerie);
  }
}
