import { Component } from '@angular/core';
import { Router    } from '@angular/router';

// Servicios
import { FechasService } from '../../services/fechas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fechas: Fecha[] = [];
  etiquetas: string[];
  prueba: any;

  /*
  ┌ ─────────────── ┐
  |     GENERAL     |
  └ ─────────────── ┘
  */

  constructor(private router: Router, private servicioFechas: FechasService) {
    this.servicioFechas.getFechas().subscribe( (data: Fecha[]) => {

      // Guardamos las fechas
      this.fechas = data;

      // Hacemos visible solo la primera fecha
      let i: number = 0;
      this.fechas.forEach( item => {
        if (i === 0) {
          i = i + 1;
          item.display = 'block';
        } else {
          item.display = 'none';
        }
      });
    });
  }
  
  /*
  ┌ ──────────────── ┐
  |     BUSCADOR     |
  └ ──────────────── ┘
  */

  buscarFecha( secuencia: string ) {
  
    // Eliminamos los espacios innecesarios
    secuencia = secuencia.trim();

    // Utilizamos el buscador si la secuenca contiene al menos un carácter
    if (secuencia.trim() === '') {
      this.router.navigate( ['/home'] );
      
      // Focus en el input
      let entrada = document.getElementById('entrada');
      entrada.focus();

      // Resaltamos el input en rojo para indicarle al usuario que no ha escrito nada
      entrada.classList.add('vacia');
      setTimeout(function() {
        entrada.classList.remove('vacia');
      }, 150);
    } else {

      this.cerrarBuscador();

      this.router.navigate( ['/resultados', secuencia] );
    }
  }

  mostrarBuscador() {
    let formularioBusqueda = document.getElementById('formulario-busqueda');
    formularioBusqueda.style.top = '0';

    let entrada = document.getElementById('entrada');
    entrada.focus();
  }

  cerrarBuscador() {

    // Vaciamos el input
    (<HTMLInputElement>document.getElementById('entrada')).value = '';

    // Ocultamos el formulario de búsqueda
    let formularioBusqueda = document.getElementById('formulario-busqueda');
    formularioBusqueda.style.top = '-75px';
  }

  /*
  ┌ ──────────────── ┐
  |     CARRUSEL     |
  └ ──────────────── ┘
  */

  anterior() {
    
    let indice  : number = 0;
    let posicion: number = 0;

    // Buscamos la posición de la categoría activa
    this.fechas.forEach( fecha => {
      if (fecha.display === 'block') {
        posicion = indice;
      }
      indice++;
    });

    // Desactivamos la categoría activa
    this.fechas[posicion].display = 'none';

    // Decrementamos la posición
    posicion = ( posicion === 0 ) ? this.fechas.length - 1 : posicion - 1;

    // Activamos la categoría anterior
    this.fechas[posicion].display = 'block';
  }

  siguiente() {

    let indice  : number = 0;
    let posicion: number = 0;

    // Buscamos la posición de la categoría activa
    this.fechas.forEach(fecha => {
      if (fecha.display === 'block') {
        posicion = indice;
      }
      indice++;
    });

    // Desactivamos la categoría activa
    this.fechas[posicion].display = 'none';

    // Decrementamos la posición
    posicion = ( posicion === this.fechas.length - 1 ) ? 0 : posicion + 1;

    // Activamos la categoría anterior
    this.fechas[posicion].display = 'block';
  }
}

export interface Fecha {
  id: number;
  etiqueta: string;
  imagen: string;
  display: string;
}
