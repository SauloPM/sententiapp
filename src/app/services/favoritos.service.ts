import { Injectable } from '@angular/core';

// Interfaces
import { Sentencia } from '../interfaces/sentencia';

// BD local
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  favoritos: Sentencia[] = [];

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private storage: Storage ) { }

  guardarFavoritos( sentencia: Sentencia ) {

    const existe = this.favoritos.find( item => item.id == sentencia.id ) ? true : false;

    if (!existe) {
      this.favoritos.unshift( sentencia );
      this.storage.set( 'favoritos', this.favoritos );
    }
  }

  cargarFavoritos() {

  }

}
