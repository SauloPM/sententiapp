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

  crearFavorito( sentencia: Sentencia ) {

    // Insertamos la sentencia al comienzo de la variable
    this.favoritos.unshift( sentencia );

    // Sobreescribimos el campo de favoritos del local storage, ahora actualizado
    this.storage.set( 'favoritos', this.favoritos );

  }

  actualizarFavorito( sentencia: Sentencia ) {

    // Localizamos la posición de la sentencia cuya reacción deseamos actualizar
    let i = this.favoritos.findIndex( item => item.id === sentencia.id );

    // Actualizamos la reacción
    this.favoritos[i] = sentencia;

    // Sobreescribimos el campo de favoritos del local storage, ahora actualizado
    this.storage.set( 'favoritos', this.favoritos );

  }

  eliminarFavorito( sentencia: Sentencia ) {

    // Eliminamos la sentencia de la variable
    this.favoritos = this.favoritos.filter( item => item.id !== sentencia.id  );

    // Sobreescribimos el campo de favoritos del local storage, ahora actualizado
    this.storage.set( 'favoritos', this.favoritos );
    
  }

  existeFavorito( sentencia: Sentencia ) {
    return this.favoritos.find( item => item.id === sentencia.id ) ? true : false;
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
    }

    // Código equivalente (es una promesa) a la instrucción de arriba que utiliza un await y async delante del identificador de la función
    // this.storage.get( 'favoritos' ).then( favoritos => {
      //   console.log('favoritos', favoritos)
    // });
  }
}
