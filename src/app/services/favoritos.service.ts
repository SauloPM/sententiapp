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

  constructor( private storage: Storage ) {
    this.cargarFavoritos()
  }

  guardarFavoritos( sentencia: Sentencia, estado: string ) {

    const existe = this.favoritos.find( item => item.id == sentencia.id ) ? true : false;

    console.log( estado );

    if ( !existe ) {
      this.favoritos.unshift( sentencia );
      this.storage.set( estado, this.favoritos );
    }
  }

  eliminarFavorito( id: number ) {
    this.favoritos = this.favoritos.filter( item => item.id != id  );
    this.storage.set( 'favoritos', this.favoritos );
  }

  existe( id: number ) {
    return this.favoritos.find( item => item.id == id ) ? true : false;
  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get( 'Me enamora' );

    if ( favoritos ) {
      this.favoritos = favoritos;
    }

    // Código equivalente (es una promesa) a la instrucción de arriba que utiliza un await y async delante del identificador de la función
    // this.storage.get( 'favoritos' ).then( favoritos => {
      //   console.log('favoritos', favoritos)
    // });
  }

}
