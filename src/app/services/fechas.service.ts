import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Fecha } from '../interfaces/fechas';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  fechas: any;
  fechasPrueba: Fecha[] = [
    {
      id: 0,
      titulo: 'Día de la mujer',
      imagen: '../../assets/img/fechas/mujer.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      display: 'block',
      sentencias: [
        'sentencia número 1',
        'sentencia número 2',
        'sentencia número 3',
        'sentencia número 4',
        'sentencia número 5',
        'sentencia número 6',
        'sentencia número 7',
        'sentencia número 8',
        'sentencia número 9',
        'sentencia número 10'
      ]
    },
    {
      id: 1,
      titulo: 'Día del padre',
      imagen: '../../assets/img/fechas/padre.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      display: 'none',
      sentencias: [
        'sentencia número 1',
        'sentencia número 2',
        'sentencia número 3',
        'sentencia número 4',
        'sentencia número 5',
        'sentencia número 6',
        'sentencia número 7',
        'sentencia número 8',
        'sentencia número 9',
        'sentencia número 10'
      ]
    },
    {
      id: 2,
      titulo: 'Día de la naturaleza',
      imagen: '../../assets/img/fechas/naturaleza.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      display: 'none',
      sentencias: [
        'sentencia número 1',
        'sentencia número 2',
        'sentencia número 3',
        'sentencia número 4',
        'sentencia número 5',
        'sentencia número 6',
        'sentencia número 7',
        'sentencia número 8',
        'sentencia número 9',
        'sentencia número 10'
      ]
    },
    {
      id: 3,
      titulo: 'Día de la poesía',
      imagen: '../../assets/img/fechas/poesia.png',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      display: 'none',
      sentencias: [
        'sentencia número 1',
        'sentencia número 2',
        'sentencia número 3',
        'sentencia número 4',
        'sentencia número 5',
        'sentencia número 6',
        'sentencia número 7',
        'sentencia número 8',
        'sentencia número 9',
        'sentencia número 10'
      ]
    },
    {
      id: 4,
      titulo: 'Día del beso',
      imagen: '../../assets/img/fechas/beso.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      display: 'none',
      sentencias: [
        'sentencia número 1',
        'sentencia número 2',
        'sentencia número 3',
        'sentencia número 4',
        'sentencia número 5',
        'sentencia número 6',
        'sentencia número 7',
        'sentencia número 8',
        'sentencia número 9',
        'sentencia número 10'
      ]
    }
  ];

  constructor( private http: HttpClient ) { }

  getFechas() {
    return this.http.get('http://localhost:55852/sentencias.asmx/MostrarDatosInicio');
  }

  getFecha(id: number) {
    return this.fechas[id];
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
  getFechasAleatorias(id: number) {

    let posicion: number;
    let resultados: Fecha[] = new Array(3);

    for (let i = 0; i < 3; i++) {

      // Número aleatorio entre 0 y el tamaño del vector categorias - 1
      do {
        posicion = Math.floor(Math.random() * this.fechas.length);
      } while (resultados.includes(this.fechas[posicion]) || posicion === id);

      resultados[i] = this.fechas[posicion];
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
