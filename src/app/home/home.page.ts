import { Component  } from '@angular/core';
import { Router     } from '@angular/router';

// Interfaces
import { Fecha } from '../interfaces/fechas';

// Servicios
import { FechasService } from '../services/fechas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fechas: any[] = [];
  etiquetas: string[];
  prueba: any;

  // ─────────────── //
  //     GENERAL     //
  // ─────────────── //

  constructor(private router: Router, private servicioFechas: FechasService) {
    this.servicioFechas.getFechas().subscribe( (data: any[]) => {
      console.log(data);
      this.fechas = data;
    });
  }

  getEtiquetas() {

    let resultado: string[] = [];

    this.fechas.forEach(function (valor, indice, vector) {
      resultado.push(vector[indice].etiqueta);
    });

    return resultado;
  }

  // ──────────────── //
  //     BUSCADOR     //
  // ──────────────── //

  // Método que muestra los resultados de la búsqueda
  buscarFecha(secuencia: string) {
  
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
    let formularioBusqueda = document.getElementById('formulario-busqueda');
    formularioBusqueda.style.top = '-75px';
  }

  // ──────────────── //
  //     CARRUSEL     //
  // ──────────────── //

  // Mostrar categoría anterior
  anterior() {
    
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
    posicion = ( posicion === 0 ) ? this.fechas.length - 1 : posicion - 1;

    // Activamos la categoría anterior
    this.fechas[posicion].display = 'block';
  }

  // Mostrar categoría siguiente
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
