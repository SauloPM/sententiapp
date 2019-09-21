import { Component, OnInit } from '@angular/core';
import { Router    } from '@angular/router';

// Interfaces
import { Fecha } from '../../interfaces/fecha';

// Servicios
import { FechasService } from '../../services/fechas.service';

// jQuery
declare var $: any;
// import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {

  fechas: Fecha[] = [];

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor(private router: Router, private servicioFechas: FechasService) {

    // Guardamos en una variable todas las fechas
    this.servicioFechas.getFechas().subscribe( ( data ) => {
      this.fechas = data;
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
      
      // Vaciamos la entrada
      $(".entrada").val("");

      // Mostramos de nuevo todas las fechas
      filtrar();
      
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
      filtrar();
    });

    function filtrar() {

      var etiqueta      = "";
      var secuencia = $(".entrada").val().toLowerCase().trim();

      $(".fecha .etiqueta").each(function () {

        etiqueta = $(this).html().toLowerCase();

          // Ha habido coincidencias o no se ha escrito nada
          if ((etiqueta.indexOf(secuencia) > -1) || (secuencia.length == 0)) {
              $(this).parent().parent().css("display", "flex");
          }

          // No ha habido coincidencia
          else {
              $(this).parent().parent().css("display", "none");
          }
      });
    }
  }
}