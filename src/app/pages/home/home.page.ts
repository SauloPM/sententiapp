import { PushService } from './../../services/push.service';
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Fecha     } from '../../interfaces/fecha';
import { Categoria } from './../../interfaces/categoria';

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
  recuento: number = 0;
  fechas: Fecha[]  = [];
  categorias: Categoria[] = [];
  categoriaSeleccionada: string = 'Todos';

  configuracion = {
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    autoHeight: true,
  };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( public servicioFechas: FechasService, private pushService: PushService ) {

    // Notificaciones push (pendiente)
    this.pushService.getDeviceID().get()
      .then (( uuid:  any ) => console.log(uuid) )
      .catch(( error: any ) => console.log(error));

  }

  ngOnInit() {

    this.getFechas(); // Guardamos en una variable todas las fechas

    this.getCategorias(); // Guardamos en una variable todas las categorías

    // Abrir buscador
    $(document).on('click', '.buscador.cerrado', function() {


      if ($('.cierre').css('display') == 'flex')
        return;
  
      $('.buscador').removeClass('cerrado').addClass('abierto');
      
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

  cambiarCategoria( categoria: Categoria ) {
  
    this.categoriaSeleccionada = categoria.categoria;

    this.servicioFechas.getFechasPorCategoria( this.categoriaSeleccionada ).subscribe( data => {
      
      this.fechas   = data;
      this.recuento = data.length;

      // La fecha genérica no debe aparecer al comienzo del listado, sino al final
      this.colocarAlFinal( this.fechas.find( item => item.id === 1 ) );

    });
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //
  
  getFechas() {
    this.servicioFechas.getFechas().subscribe( resultado => {

      this.fechas   = resultado;
      this.recuento = resultado.length;

      // La fecha genérica no debe aparecer al comienzo del listado, sino al final
      this.colocarAlFinal( this.fechas.find( item => item.id === 1 ) );

    });
  }

  getCategorias() {
    this.servicioFechas.getCategorias().subscribe( resultado => {
      this.categorias = resultado;
      this.categorias.unshift({ categoria: 'Todos' });
    });
  }

  colocarAlFinal( omnibusOccasionibus: Fecha ) {
    if ( omnibusOccasionibus ) {
      this.fechas.shift();
      this.fechas.push( omnibusOccasionibus );
    }
  }
}
