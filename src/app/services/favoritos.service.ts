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
    this.cargarFavoritos();
  }

  guardarFavoritos( sentencia: Sentencia, reaccion: string ) {

    const existe = this.favoritos.find( item => item.id === sentencia.id ) ? true : false;

    if ( !existe ) {
      console.log( 'no existe' );
      sentencia.reaccion = reaccion;
      this.favoritos.unshift( sentencia );
      this.storage.set( 'favoritos', this.favoritos );
    } else {

      if ( sentencia.reaccion === reaccion ) {
        console.log( 'existe' );
        this.eliminarFavorito( sentencia.id );
      } else {
        console.log( 'existe, pero el estado es diferente' );
        this.eliminarFavorito( sentencia.id );
        sentencia.reaccion = reaccion;
        this.favoritos.unshift( sentencia );
        this.storage.set( 'favoritos', this.favoritos );
      }
    }
  }

  eliminarFavorito( id: number ) {

    // Eliminamos la sentencia de la variable
    this.favoritos = this.favoritos.filter( item => item.id !== id  );

    // Volvemos a almacenar la variable en el local storage sin la sentencia eliminada
    this.storage.set( 'favoritos', this.favoritos );
    
  }

  getReaccion( id: number ) {
    
    // const EXISTE = this.favoritos.find( item => item.id === id ) ? true : false;
    
    let reaccion = '';

    for ( let i = 0; i < this.favoritos.length; i++) {
      if ( this.favoritos[i].id === id && this.favoritos[i].reaccion.length > 0 ) {
        reaccion = this.favoritos[i].reaccion;
        break;
      }
    }

    return reaccion;

  }

  cambiarReaccion( id: number, reaccion: string) {
    
    let index = this.favoritos.findIndex( item => item.id === id );

    this.favoritos[ index ].reaccion = reaccion;
    
  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get( 'favoritos' );

    if ( favoritos ) {
      this.favoritos = favoritos;
      console.log( 'Listado de favoritos:');
      console.log( '──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
      console.log( this.favoritos );
      console.log( '──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
    }

    // Código equivalente (es una promesa) a la instrucción de arriba que utiliza un await y async delante del identificador de la función
    // this.storage.get( 'favoritos' ).then( favoritos => {
      //   console.log('favoritos', favoritos)
    // });
  }
}
