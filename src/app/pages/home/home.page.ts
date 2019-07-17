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

  // Atributos
  fechas: Fecha[] = [];
  etiquetas: string[];
  prueba: any;
  fontSize = 'size-md';

  mostrarCierre : string = '';
  mostrarEntrada: string = '';

  // ─────────────── //
  //     GENERAL     //
  // ─────────────── //

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
          this.fontSize = item.etiqueta.length > 25 ? 'size-xs' : 'size-md';
        } else {
          item.display = 'none';
        }
      });
    });
  }
  
  // ──────────────── //
  //     BUSCADOR     //
  // ──────────────── //

  mostrarBuscador(secuencia: string) {

    secuencia = secuencia.trim();
    
    // El buscador está visible
    if ( this.mostrarEntrada === 'activa' ) {

      // Hemos escrito algo
      if ( secuencia.length > 0 ) {
        this.buscarFecha( secuencia );
      }

      // No hemos escrito nada
      else {

        let entrada = document.getElementById('entrada');

        // Hacemos focus
        entrada.focus();

        // Resaltamos el input en rojo para indicarle al usuario que no ha escrito nada
        entrada.classList.add('vacia');
        setTimeout(() => {
          entrada.classList.remove('vacia');
        }, 500);
      }
    }

    // El buscador no está visible
    else {
      
      this.mostrarEntrada = 'activa';

      setTimeout(() => {
        this.mostrarCierre = 'activa';
      }, 500);

    }
  }

  cerrarBuscador() {

    // Vaciamos el input
    (<HTMLInputElement>document.getElementById('entrada')).value = '';

    // Ocultamos el formulario de búsqueda
    this.mostrarCierre = '';

    setTimeout(() => {
      this.mostrarEntrada = '';
    }, 500);
    
  }

  buscarFecha( secuencia: string ) {
  
    // Utilizamos el buscador si la secuenca contiene al menos un carácter
    if (secuencia.trim() === '') {
      this.router.navigate( ['/home'] );
      
      

      
    } else {

      this.cerrarBuscador();

      this.router.navigate( ['/resultados', secuencia] );
    }
  }

  // ──────────────── //
  //     CARRUSEL     //
  // ──────────────── //

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

    this.fontSize = this.fechas[posicion].etiqueta.length > 25 ? 'size-xs' : 'size-md';
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

    this.fontSize = this.fechas[posicion].etiqueta.length > 25 ? 'size-xs' : 'size-md';
  }
}

export interface Fecha {
  id: number;
  etiqueta: string;
  imagen: string;
  display: string;
}
