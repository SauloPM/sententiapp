import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Categoria } from './../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categorias: Categoria[] = [
    {
      id: 0,
      titulo: 'Día de la mujer',
      imagen: '../../assets/img/categorias/mujer.jpg',
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
      imagen: '../../assets/img/categorias/padre.jpg',
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
      imagen: '../../assets/img/categorias/naturaleza.jpg',
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
      imagen: '../../assets/img/categorias/poesia.png',
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
      imagen: '../../assets/img/categorias/beso.jpg',
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

  constructor( private http: HttpClient ) {

    // Notificamos al usuario que el servicio está disponible
    console.log('Servicio de categorías listo para ser utilizado');

    // Mostramos los datos por consola para que el usuario sepa que los datos se devuelven correctamente
    // Esto es simplemente para mostrar los datos por consola, no tiene ningún otro efecto
    this.getCategorias();
  }

  getCategorias() {
    return this.categorias;
    // return this.http.get('assets/data/categorias.json').pipe(tap(console.log));
  }

  getCategoria(id: number) {
    return this.categorias[id];
  }

  buscarCategoria(secuencia: string) {
    
    let resultados: Categoria[];
    secuencia = secuencia.toLowerCase();

    for (let categoria of this.categorias) {

      let titulo: string = categoria.titulo.toLowerCase();

      if ( titulo.indexOf(secuencia) >= 0 ) {
        resultados.push(categoria);
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
  getCategoriasAleatorias(id: number) {

    let posicion: number;
    let resultados: Categoria[] = new Array(3);

    for (let i = 0; i < 3; i++) {

      // Número aleatorio entre 0 y el tamaño del vector categorias - 1
      do {
        posicion = Math.floor(Math.random() * this.categorias.length);
      } while (resultados.includes(this.categorias[posicion]) || posicion === id);

      resultados[i] = this.categorias[posicion];
    }

    return resultados;
  }

  /*

    · Función que devuelve un vector de fechas cuyo título albergue la secuencia pasada por parámetro

  */
  buscarFechas( secuencia: string ) {

    let resultados: Categoria[] = [];
    secuencia = secuencia.toLowerCase();

    for (let fecha of this.categorias) {

      let titulo: string = fecha.titulo;
      titulo = titulo.toLowerCase();

      if ( titulo.toString().indexOf(secuencia) >= 0 ) {
        resultados.push(fecha);
      }
    }

    return resultados;
  }
}
