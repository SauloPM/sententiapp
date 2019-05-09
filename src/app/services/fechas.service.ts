import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Fecha } from '../interfaces/fechas';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  fechas: any;

  constructor( private http: HttpClient ) { }

  getFechas() {
    return this.http.get('http://localhost:55852/sentencias.asmx/MostrarFechas');
  }

  getFecha(id: number) {
    // return this.http.get('http://localhost:55852/sentencias.asmx/MostrarInformacion?id=' + id);
    return this.http.get('http://localhost:55852/sentencias.asmx/MostrarInformacion?id=5');
  }

  buscarFecha(secuencia: string) {
    
    let resultados: Fecha[];
    secuencia = secuencia.toLowerCase();

    for (let fechas of this.fechas) {

      let titulo: string = fechas.titulo.toLowerCase();

      if ( titulo.indexOf(secuencia) >= 0 ) {
        resultados.push(fechas);
      }
    }

    return resultados;
  }

  /*

    · Función que devuelve un vector de cuatro categorías seleccionadas aleatoriamente
    · Ninguna de dichas categorías puede ser la que tenga el identificador pasado por parámetro
    · ¿Por qué? Porque esta función se utiliza cuando hemos abierto una categoría y deseamos mostrar otras categorías
    · No tiene sentido tener una categoría abierta y abajo mostrar un acceso directo a ella misma: es redundante

  */
  getFechasAleatorias(id: number, fechas: any[]) {

    let posicion: number;
    let resultados: any[] = new Array(3);

    for (let i = 0; i < 3; i++) {

      // Número aleatorio entre 0 y el tamaño del vector categorias - 1
      do {
        posicion = Math.floor(Math.random() * fechas.length);
      } while (resultados.includes(fechas[posicion]) || posicion === id);

      resultados[i] = fechas[posicion];
    }

    return resultados;
  }

  /*

    · Función que devuelve un vector de fechas cuyo título albergue la secuencia pasada por parámetro

  */
  buscarFechas( secuencia: string ) {

    let resultados: Fecha[] = [];
    secuencia = secuencia.toLowerCase();

    for (let fecha of this.fechas) {

      let titulo: string = fecha.titulo;
      titulo = titulo.toLowerCase();

      if ( titulo.toString().indexOf(secuencia) >= 0 ) {
        resultados.push(fecha);
      }
    }

    return resultados;
  }
}
