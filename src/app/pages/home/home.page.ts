import { PushService } from './../../services/push.service';
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Fecha     } from '../../interfaces/fecha';
import { Categoria } from 'src/app/interfaces/categoria';

// Servicios
import { FechasService } from '../../services/fechas.service';

// Get Device ID
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

// jQuery
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {

  deviceID: number = 0;

  fechas: Fecha[] = [];
  categorias: Categoria[] = [];

  categoriaActiva: Categoria = { categoria: 'Todos' };

  configuracion = {
    // loop: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    // centeredSlides: true,
    autoHeight: true,
    pagination: false,
    navigation: false
  };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( public servicioFechas: FechasService, private pushService: PushService ) {
    
    // Guardamos en una variable todas las fechas
    this.servicioFechas.getFechas().subscribe( ( data ) => {
      this.fechas = data;
    });

    // Guardamos en una variable todas las categorías
    this.servicioFechas.getCategorias().subscribe( ( data ) => {
      
      this.categorias =  data;

      // Insertamos la categoría por defecto en el filtro de categorías
      this.categorias.unshift({ categoria: 'Todos' });

    });

    this.pushService.getDeviceID().get()
      .then (( uuid:  any ) => console.log(uuid) )
      .catch(( error: any ) => console.log(error));

  }

  ngOnInit() {

    // Abrir buscador
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

    // Cerrar buscador
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
    });

    // Escribir algo en el buscador
    $(document).on("input", ".entrada", function () {
      filtrar();
    });

    // Seleccionar categoría del filtro
    $(document).on('click', '.filtro .item', function() {
      $('.filtro .item.seleccionado').removeClass('seleccionado');
      $(this).addClass('seleccionado');
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

  cambiarCategoria( categoriaSeleccionada: string ) {

    this.categoriaActiva.categoria = categoriaSeleccionada;

    // Cuando se selecciona la primera categoría del filtro, se muestran todas las fechas
    if ( categoriaSeleccionada === this.categorias[0].categoria ) {
      this.servicioFechas.getFechas().subscribe( ( data ) => {
        this.fechas = data;
      });
    }

    // Cuando se seleccione cualquier otra, solo se muestran las fechas que correspondan a la categoría seleccionada
    else {
      this.servicioFechas.getFechasPorCategoria( categoriaSeleccionada ).subscribe( ( data ) => {
        this.fechas = data;

        let fechaGenerica = this.fechas.find( item => item.id === 1 );
        
        // La fecha genérica se ha de poner al final a petición de Gregorio
        if ( fechaGenerica ) {
          this.fechas.shift();
          this.fechas.push( fechaGenerica );
        }

      });
    }
  }
}






