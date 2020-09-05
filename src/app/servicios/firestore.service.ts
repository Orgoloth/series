import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

export interface Item {
  idSerie: number;
  siguiendo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  SeriesColeccion: AngularFirestoreCollection<Item>;
  Series: Observable<Item[]>;

  constructor(private firestore: AngularFirestore) {
    // Traemos las series que están en seguimiento
    this.SeriesColeccion = this.firestore.collection<Item>('series');
    this.Series = this.SeriesColeccion.valueChanges();
  }

  cambiarSeguimiento(idSerie: number) {
    this.Series.subscribe((data: Item[]) => {
      const encontrado = data.find((item) => item.idSerie === idSerie);
      if (encontrado) {
        console.log(
          'Intentando cambiar estado a un elemento ya existente',
          encontrado
        );

        encontrado.siguiendo = !encontrado.siguiendo;
      } else {
        console.log(
          'Intentando cambiar estado a un elemento que no existia, creando...'
        );
        this.SeriesColeccion.add({ idSerie, siguiendo: true });
        
      }
    });
  }
}
