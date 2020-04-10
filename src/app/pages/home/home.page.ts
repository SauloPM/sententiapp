import { Router            } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Fecha     } from '../../interfaces/fecha';
import { Categoria } from './../../interfaces/categoria';

// Servicios
import { FechasService   } from '../../services/fechas.service';

// jQuery
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

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

  constructor( private router: Router, public servicioFechas: FechasService ) {}

  async ngOnInit() {

    this.getFechas(); // Guardamos en una variable todas las fechas

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

      var etiqueta  = '';
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

    this.getFechasPorCategoria( this.categoriaSeleccionada );

  }

  seleccionarFecha( fecha: Fecha ) {

    this.router.navigate([ '/informacion', fecha.id, this.categoriaSeleccionada ], { skipLocationChange: true });

  }

  /*

  abrirBuscador() {

    if ( !this.buscadorCerrado ) {
      return;
    }
  
    $( '.mango' ).css( 'opacity', '0' );
    $( '.buscador' ).removeClass( 'cerrado' ).addClass( 'abierto' );
    
    setTimeout(() => { $( '.buscador' ).css( 'border-radius', '2px'   )}, 250);
    setTimeout(() => { $( '.buscador' ).css( 'width'        , '100%'  )}, 500);
    setTimeout(() => { $( '.buscador' ).css( 'height'       , '50px'  )}, 1000);
    setTimeout(() => { $( '.entrada'  ).css( 'display'      , 'block' ).focus() }, 1500);
    setTimeout(() => { $( '.cierre'   ).css( 'display'      , 'flex'  )}, 1750);
  }

  cerrarBuscador() {

    if ( this.buscadorCerrado ) {
      return;
    }

    // Vaciamos la entrada
    $( '.entrada' ).val( '' );

    // Mostramos de nuevo todas las fechas
    this.filtrar();
    
    $( '.cierre'  ).css( 'display', 'none' );
    $( '.entrada' ).css( 'display', 'none' );
    $( '.buscador' ).removeClass( 'abierto' ).addClass( 'cerrado' ).css( 'width', '30px' );

    setTimeout(() => { 
      $('.buscador').animate({ height: '30px' }, 500);
    }, 500);
    
    setTimeout(() => { 
      $('.buscador').animate({ borderRadius: '50%' }, 500);
    }, 1000);
    
    setTimeout(() => { 
      $('.mango').animate({ opacity: '1' }, 250);
      $('.buscador').removeClass('abierto').addClass('cerrado');
    }, 1500);
  }

  filtrar() {

    var etiqueta  = '';
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

  */

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //
  
  getFechas() {

    this.servicioFechas.getFechas().subscribe(
      
      data => {
        this.fechas   = data;
        this.recuento = data.length;
      },
      error => {
        console.log( 'Se ha producido un error', error );
        this.notificarUsuario( 'Se ha producido un error al cargar el listado de fechas' );
      },
      () => {
        this.ordenarFechas();
        this.getCategorias();
      }
    );
  }

  getCategorias() {
    
    this.servicioFechas.getCategorias().subscribe(

      data => {
        this.categorias = data;
      },
      error => {
        console.log( 'Se ha producido un error', error );
        this.notificarUsuario( 'Se ha producido un error al cargar las categorías' );
      },
      () => this.categorias.unshift({ categoria: 'Todos' }) // Creamos manualmente la categoría 'Todos' y la situamos al comienzo del listado de categorías
    );
  }

  getFechasPorCategoria( categoria: string ) {

    this.servicioFechas.getFechasPorCategoria( categoria ).subscribe(
      
      data => {
        this.fechas   = data;
        this.recuento = data.length;
      },
      error => {
        console.log( 'Se ha producido un error', error );
        this.notificarUsuario( 'Se ha producido un error al cargar el listado de fechas' );
      },
      () => this.ordenarFechas() // Situamos la fecha genérica al final del listado de fechas
    );
  }

  ordenarFechas() {

    let dia: string;
    let mes: string;
    let meses = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

    for( let i = 0; i < meses.length; i++ ) {

      this.fechas.forEach(( fecha ) => {

        if ( fecha['dia'].includes( meses[i] )) {
          fecha['dia'] = fecha['dia'].replace( ` de ${ meses[i] }`, '' );
          fecha['dia'] = fecha['dia'].length == 1 ? `0${ fecha['dia'] }` : fecha['dia'];
          mes = ( i + 1 ) < 10 ? `0${ i + 1 }` : ( i + 1 ).toString();
          fecha['dia'] = `${ mes }${ fecha['dia'] }`
        }
      });
    }

    this.fechas.sort( function( fechaA, fechaB ) { return fechaA['dia'] - fechaB['dia'] });

    this.fechas.forEach(( fecha ) => {

      // Ignoramos la fecha genérica
      if ( fecha['id'] === 1 ) {
        return;
      }

      // Extraemos el día y el mes de la fecha, respectivamente
      dia = fecha['dia'].substring(2,4);
      mes = fecha['dia'].substring(0,2);

      // Eliminamos los ceros innecesarios de la izquierda
      dia = dia[0] === '0' ? dia[1] : dia;
      mes = mes[0] === '0' ? mes[1] : mes;

      // Situamos primero el día y luego el mes
      fecha['dia'] = dia + ' de ' + meses[ parseInt( mes ) - 1 ];
    });

    // Situamos la fecha genérica al final del listado de fechas
    this.colocarAlFinal( this.fechas.find( item => item.id === 1 ));
  }

  colocarAlFinal( omnibusOccasionibus: Fecha ) {
    if ( omnibusOccasionibus ) {
      this.fechas.shift();
      this.fechas.push( omnibusOccasionibus );
    }
  }

  notificarUsuario( mensaje: string ) {

    $( '.notificacion-usuario .mensaje' ).html( mensaje );

    $( '.notificacion-usuario'       ).css( 'opacity',    '1' );
    $( '.notificacion-usuario .raya' ).css(   'width', '100%' );

    setTimeout(() => {
      $( '.notificacion-usuario'       ).css( 'opacity', '' );
      $( '.notificacion-usuario .raya' ).css(   'width', '' );
    }, 3000);
  }
}
