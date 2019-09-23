import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Interfaces
import { Fecha     } from '../interfaces/fecha';
import { Categoria } from '../interfaces/categoria';
import { Sentencia } from '../interfaces/sentencia';

// Variables
const urlApi      = environment.urlApi;
const urlApiLocal = environment.urlApiLocal;

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor( private http: HttpClient ) {}

  // ─────────────── //
  //     PORTADA     //
  // ─────────────── //

  // Función que solicita un JSON mediante HTTP (método GET) con el ID, la etiqueta, el día y la imagen de toda las fechas 
  getFechas() {
    return this.ejecutarApi<Fecha[]>( 'MostrarFechas' );
  }

  // Función que solicita un JSON mediante HTTP (método GET) con la categoría de todas las fechas 
  getCategorias() {
    return this.ejecutarApi<Categoria[]>( 'MostrarCategorias' );
  }

  getFechasPorCategoria( categoria: string ) {
    return this.ejecutarApi<Fecha[]>( `MostrarFechasPorCategoria?categoria=${ categoria }` );
  }

  // ─────────────────── //
  //     INFORMACIÓN     //
  // ─────────────────── //

  // Función que solicita un JSON mediante HTTP (método GET) con todos los datos de la fecha cuyo ID se envía como parámetro
  getDatosFecha( id: number ) {
    return this.ejecutarApi<Fecha>( `MostrarInformacionFecha?id=${ id }` );
  }

  // Función que solicita un JSON mediante HTTP (método GET) con todas las sentencias y sus autores de la fecha cuyo ID se envía como parámetro
  getSentencias( id: number ) {
    return this.ejecutarApi<Sentencia[]>(`MostrarSentencias?id=${ id }`);
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  private ejecutarApi<T>( metodo: string, prod: boolean = true ) {

    let url: string = prod ? urlApi + metodo : urlApiLocal + metodo;

    return this.http.get<T>(`${ url }`);

  }
}
