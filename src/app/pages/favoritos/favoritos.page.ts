import { Sentencia } from './../../interfaces/sentencia';
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Fecha } from 'src/app/interfaces/fecha';

// Servicios
import { FechasService    } from './../../services/fechas.service';
import { FavoritosService } from './../../services/favoritos.service';

// Obtener ID único del dispositivo
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

// jQuery
declare var $: any;

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html'
})
export class FavoritosPage implements OnInit {
  
  deviceID: string;
  fechas: Fecha[];
  vacio = true;
  favoritos : any[];

  reacciones = [
    { value: 'Todos', key: 'todos' },
    { value: 'Me gusta', key: 'me-gusta' },
    { value: 'Me encanta', key: 'me-encanta' },
    { value: 'Me divierte', key: 'me-divierte' },
    { value: 'No me gusta', key: 'no-me-gusta' },
  ];

  reaccionSeleccionada = 'todos';
  
  sentencias        : Sentencia[];
  todasLasSentencias: Sentencia[];

  configuracion = {
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    autoHeight: true,
    pagination: false,
    navigation: false
  };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicioFechas: FechasService, public servicioFavoritos: FavoritosService, private uniqueDeviceID: UniqueDeviceID ) {}
  
  async ngOnInit() {

    await this.uniqueDeviceID.get()
      .then (( data : any ) => this.deviceID = data       )
      .catch(( error: any ) => this.deviceID = '74a1eb27' );

    // Obtenemos todas las fechas (para enviarlas al componente 'Otras fechas')
    this.servicioFechas.getFechas().subscribe( data => {
      this.fechas = data;

      // Obtenemos todas las sentencias
      this.servicioFechas.getSentencias().subscribe( ( data: Sentencia[] ) => {
        this.todasLasSentencias = data;

        // Obtenemos las sentencias favoritas del usuario almacenadas en Firebase
        this.servicioFavoritos.getSentencias().subscribe(( data: any[] ) => {
          this.favoritos = data.filter( item => item.id_dispositivo === this.deviceID );
          
          this.todasLasSentencias = this.filtrarSentenciasPorReaccion();
          this.sentencias = this.todasLasSentencias;
          this.vacio = this.sentencias === undefined ? true : this.sentencias.length === 0 ? true : false;
        });
      });
    });

    // Seleccionar categoría del filtro
    $( document ).on( 'click', '.filtro .item', function() {
      $( '.filtro .item.seleccionado' ).removeClass( 'seleccionado' );
      $( this ).addClass( 'seleccionado' );
    });
  }

  cambiarReaccion( reaccion: string ) {
    this.reaccionSeleccionada = reaccion;
    this.actualizarFavoritos();
  }

  actualizarFavoritos() {
    this.sentencias = this.filtrarSentenciasPorReaccion( this.reaccionSeleccionada );
    this.vacio = this.sentencias === undefined ? true : this.sentencias.length === 0 ? true : false;
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  filtrarSentenciasPorReaccion( reaccion: string = 'todos' ) {

    let resultado: Sentencia[] = [];

    for ( let i = 0; i < this.favoritos.length; i++) {
      let sentenciaEncontrada = this.todasLasSentencias.find( item => item.id == this.favoritos[i].id_sentencia );
      if ( sentenciaEncontrada != undefined ) {
        resultado.push( sentenciaEncontrada );
      }
    }

    return reaccion == 'todos' ? resultado : resultado.filter( item => item.reaccion == reaccion );
  }
}
