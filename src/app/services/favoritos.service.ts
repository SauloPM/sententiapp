import { Injectable } from '@angular/core';

// Interfaces
import { Sentencia } from '../interfaces/sentencia';

// BD local
import { Storage } from '@ionic/storage';

// Peticiones HTTP
import { HttpClient } from '@angular/common/http';

// Operadores RXJS
import { map } from 'rxjs/operators';

// Firebase
import { Observable       } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  favoritos: Sentencia[] = [];

  private url = 'https://sententiapp-889ef.firebaseio.com';

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private http: HttpClient, private angularFirestore: AngularFirestore, private storage: Storage ) {
    this.cargarFavoritos();
  }

  crearFavorito( sentencia: Sentencia, deviceID: string ) {

    // Insertamos la sentencia al comienzo de la variable
    // this.favoritos.unshift( sentencia );

    // Sobreescribimos el campo de favoritos del local storage, ahora actualizado
    // this.storage.set( 'favoritos', this.favoritos );

    let temp = {
      id: sentencia.id,
      estados: {
        meGusta: [],
        meEncanta: [],
        meDivierte: [],
        noMeGusta: []
      }
    };

    temp.estados.meDivierte.push( deviceID );

    // temp.estados.reaccion.push( deviceID );

    return this.http.post( `${ this.url }/sentencias/${ temp.id }/${ sentencia.reaccion }.json`, '2019' ); /*.pipe(
      map( ( data: any ) => {
        palabra.id = data.name;
        return palabra;
      })
    );*/

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

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  async cargarFavoritos() {

    const favoritos = await this.storage.get( 'favoritos' );

    this.favoritos = favoritos ? favoritos : [];

  }

  getSentencias() {
    return this.angularFirestore.collection( 'sentencias' ).valueChanges();
    // return this.angularFirestore.collection( 'sentencias' ).doc( deviceID ).valueChanges();
  }

  existeFavorito( sentenciasFavoritas: Sentencia[], sentenciaID: number ) {

    if ( sentenciasFavoritas[ 'me_gusta'    ] !== undefined && sentenciasFavoritas[ 'me_gusta'    ].find( id => id === sentenciaID ) > 0 ) return true;
    if ( sentenciasFavoritas[ 'me_encanta'  ] !== undefined && sentenciasFavoritas[ 'me_encanta'  ].find( id => id === sentenciaID ) > 0 ) return true;
    if ( sentenciasFavoritas[ 'me_divierte' ] !== undefined && sentenciasFavoritas[ 'me_divierte' ].find( id => id === sentenciaID ) > 0 ) return true;
    if ( sentenciasFavoritas[ 'no_me_gusta' ] !== undefined && sentenciasFavoritas[ 'no_me_gusta' ].find( id => id === sentenciaID ) > 0 ) return true;

    return false;
  }
}