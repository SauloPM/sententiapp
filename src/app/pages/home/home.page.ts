import { Component, OnInit } from '@angular/core';
import { Router    } from '@angular/router';

// Servicios
import { FechasService } from '../../services/fechas.service';

// jQuery
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {

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
          // this.fontSize = item.etiqueta.length > 25 ? 'size-xs' : 'size-md';
          //$('.overlay').css('background-image', 'url(http://sententiapp.iatext.ulpgc.es' + item.imagen + ')');
        } else {
          item.display = 'none';
        }
      });
    });
  }

  ngOnInit() {

    $(document).on("click", ".buscador.cerrado", function() {

      if ($(".cierre").css("display") == "flex")
        return;
  
      $(".buscador").removeClass("cerrado").addClass("abierto");
      
      $(".buscador").css('cursor', 'initial');
  
      $(".mango").animate({ opacity: '0' }, 250);
      
      setTimeout( function() {
        $(".buscador").animate({ borderRadius: '2px' }, 500);
      }, 250);
  
      setTimeout( function() {
        $(".buscador").animate({ width: '100%' }, 500);
      }, 500);
      
      setTimeout( function() {
        $(".buscador").animate({ height: '50px' }, 500);
      }, 1000);
  
      setTimeout( function() {
        $(".entrada").css('display', 'block').focus();
      }, 1500);
  
      setTimeout( function() {
        $(".cierre").css('display', 'flex');
      }, 1750);
    });

    $(document).on("click", ".buscador.abierto .cierre", function() {
      
      $(".buscador").removeClass("abierto").addClass("cerrado");

      $(".buscador").css('cursor', 'pointer');

      $(".cierre").css('display', 'none');

      $(".entrada").css('display', 'none');

      $(".buscador").animate({ width: '30px' }, 500);
      
      setTimeout( function() {
        $(".buscador").animate({ height: '30px' }, 500);
      }, 500);
      
      setTimeout( function() {
        $(".buscador").animate({ borderRadius: '50%' }, 500);
      }, 1000);
      
      setTimeout( function() {
        $(".mango").animate({ opacity: '1' }, 250);
        $(".buscador").removeClass("abierto").addClass("cerrado");
      }, 1500);
    })

    $(document).on("input", ".entrada", function () {

      var titulo      = "";
      var secuencia = $(".entrada").val().toLowerCase().trim();

      $(".fecha .titulo").each(function () {

          titulo = $(this).html().toLowerCase();

          // Ha habido coincidencias o no se ha escrito nada
          if ((titulo.indexOf(secuencia) > -1) || (secuencia.length == 0)) {
              $(this).parent().css("display", "flex");
          }

          // No ha habido coincidencia
          else {
              $(this).parent().css("display", "none");
          }
      });
  });
  }
  
  // ──────────────── //
  //     BUSCADOR     //
  // ──────────────── //

  mostrarBuscadorrrr(secuencia: string) {

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

  cerrarBuscadorrrr() {

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

    console.log(this.fechas[posicion]);

    //$('.overlay').css('background-image', 'url(http://sententiapp.iatext.ulpgc.es' + this.fechas[posicion].imagen + ')');

    // this.fontSize = this.fechas[posicion].etiqueta.length > 25 ? 'size-xs' : 'size-md';
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

    //$('.overlay').css('background-image', 'url(http://sententiapp.iatext.ulpgc.es' + this.fechas[posicion].imagen + ')');

    // this.fontSize = this.fechas[posicion].etiqueta.length > 25 ? 'size-xs' : 'size-md';
  }
}

export interface Fecha {
  id: number;
  etiqueta: string;
  imagen: string;
  display: string;
}
