import { Sentencia } from './../../interfaces/sentencia';
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Fecha } from 'src/app/interfaces/fecha';

// Servicios
import { FechasService    } from './../../services/fechas.service';
import { UsuariosService  } from './../../services/usuarios.service';
import { FavoritosService } from './../../services/favoritos.service';

// jQuery
declare var $: any;

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html'
})
export class FavoritosPage implements OnInit {
  
  vacio = true;
  usuarioID: string;
  fechas: Fecha[];
  
  reacciones = [
    { value: 'Todos'      , key: 'todos'       },
    { value: 'Me gusta'   , key: 'me-gusta'    },
    { value: 'Me encanta' , key: 'me-encanta'  },
    { value: 'Me divierte', key: 'me-divierte' },
    { value: 'No me gusta', key: 'no-me-gusta' },
  ];
  
  reaccionSeleccionada = 'todos';
  
  sentencias        : Sentencia[];
  todasLasSentencias: Sentencia[];
  sentenciasFirebase: any[];

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

  constructor( private servicioFechas: FechasService, private servicioFavoritos: FavoritosService, private usuariosService: UsuariosService ) {}
  
  async ngOnInit() {

    // Almacenamos en una variable el ID del usuario
    await this.usuariosService.getUsuarioID().then(
      data  => this.usuarioID = data,
      error => console.log( error )
    );

    // Obtenemos las sentencias de todas las fechas
    this.servicioFechas.getSentencias().subscribe(( data: Sentencia[] ) => {
      this.todasLasSentencias = data;

      // Obtenemos las sentencias almacenadas en Firebase de este dispositivo
      this.servicioFavoritos.getSentencias().subscribe(( data: any[] ) => {
        this.sentenciasFirebase = data.filter( item => item.id_dispositivo === this.usuarioID );
        
        // De todas las sentencias de todas las fechas, solo nos interesan aquellas para las que haya reaccionado desde este dispositivo
        this.todasLasSentencias = this.filtrarSentenciasPorReaccion();
        this.sentencias = this.todasLasSentencias;
        this.vacio = this.sentencias === undefined ? true : this.sentencias.length === 0 ? true : false;
      });
    });
  }

  // Seleccionar una reacción del slider de reacciones
  cambiarReaccion( reaccion: string ) {

    // Resaltamos la reacción seleccionada en el slider de reacciones
    $( '.filtro .item.seleccionado'  ).removeClass( 'seleccionado' );
    $( `.filtro .item.${ reaccion }` ).addClass   ( 'seleccionado' );

    // Actualizamos el listado de sentencias
    this.reaccionSeleccionada = reaccion;
    this.actualizarFavoritos();
  }

  // Cambiar la reacción de una sentencia
  actualizarFavoritos() {
    this.sentencias = this.filtrarSentenciasPorReaccion( this.reaccionSeleccionada );
    this.vacio = this.sentencias === undefined ? true : this.sentencias.length === 0 ? true : false;
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  filtrarSentenciasPorReaccion( reaccion: string = 'todos' ) {

    let resultado: Sentencia[] = [];

    for ( let i = 0; i < this.sentenciasFirebase.length; i++) {

      // De todas las sentencias solo nos interesan las favoritas del usuario 
      let sentenciaEncontrada = this.todasLasSentencias.find( item => item.id == this.sentenciasFirebase[i].id_sentencia );

      // Almacenamos la sentencia encontrada en una variable auxiliar
      if ( sentenciaEncontrada != undefined ) {
        resultado.push( sentenciaEncontrada );
      }
    }

    // De todas las sentencias favoritas del usuario, solo nos interesan las de una reacción determinada
    return reaccion == 'todos' ? resultado : resultado.filter( item => item.reaccion == reaccion );
  }
}
