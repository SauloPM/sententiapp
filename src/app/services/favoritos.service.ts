import { Injectable } from '@angular/core';

// Interfaces
import { Sentencia } from '../interfaces/sentencia';

// Peticiones HTTP
import { HttpClient } from '@angular/common/http';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  favoritos: Sentencia[] = [];

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private http: HttpClient, private angularFirestore: AngularFirestore ) { }

  // ──────────── //
  //     CRUD     //
  // ──────────── //

  crear( sentenciaID: number, deviceID: string, reaccion: string ) {

    this.angularFirestore.collection( 'sentencias' ).doc( deviceID + sentenciaID ).set({
      id_sentencia: sentenciaID,
      id_dispositivo: deviceID,
      reaccion: reaccion
    });

  }

  actualizar( sentenciaID: number, deviceID: string, reaccion: string ) {

    this.angularFirestore.collection( 'sentencias' ).doc( deviceID + sentenciaID ).update({
      id_sentencia: sentenciaID,
      id_dispositivo: deviceID,
      reaccion: reaccion
    });

  }

  eliminar( deviceID: string, sentenciaID: number = -1 ) {

    this.angularFirestore.collection( 'sentencias' ).doc( deviceID + sentenciaID ).delete();
    
  }

  // ──────────────── //
  //     CONSULTA     //
  // ──────────────── //

  getSentencias() {
    return this.angularFirestore.collection( 'sentencias' ).valueChanges();
  }

  getReaccion( deviceID: string, sentenciaID: number ) {
    return this.angularFirestore.collection( 'sentencias' ).doc( deviceID + sentenciaID ).valueChanges();
  }
}