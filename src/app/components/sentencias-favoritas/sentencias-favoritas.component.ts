import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Servicios
import { FavoritosService } from '../../services/favoritos.service';

// Interfaces
import { Sentencia } from '../../interfaces/sentencia';

// Compartir en RRSS
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-sentencias-favoritas',
  templateUrl: './sentencias-favoritas.component.html',
  styleUrls: ['./sentencias-favoritas.component.scss'],
})
export class SentenciasFavoritasComponent implements OnInit {

  @Input() sentencias: Sentencia[] = [];

  @Output() favoritoSeleccionado: EventEmitter<Sentencia[]>;

  configuracion = {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    autoHeight: true,
    pagination: false,
    navigation: false
  };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor(
    private socialSharing: SocialSharing,
    private servicioFavoritos: FavoritosService ) {

      this.favoritoSeleccionado = new EventEmitter();

    }

  ngOnInit() {

    // Resaltamos las sentencias favoritas
    setTimeout( () => {
      this.sentencias.forEach( ( sentencia ) => {
        sentencia.reaccion = this.servicioFavoritos.getReaccion( sentencia.id );
        // console.log( sentencia.reaccion );
      });
    }, 500);
  }

  cambiarReaccion( sentencia: Sentencia, reaccion: string ) {
    this.servicioFavoritos.guardarFavoritos( sentencia, reaccion );
    sentencia.reaccion = reaccion;
    this.favoritoSeleccionado.emit( this.sentencias );
  }

  eliminarFavorito ( sentencia: Sentencia ) {
    sentencia.reaccion = '';
    this.servicioFavoritos.eliminarFavorito( sentencia.id );
    this.favoritoSeleccionado.emit( this.sentencias );
  }

  compartir( sentencia: Sentencia ) {

    let extracto = sentencia.extractoespanol;
    let extractosActivos = document.getElementsByClassName('swiper-slide-active');

    // Detectamos qué traducción del extraco se desea compartir
    for (let i = 0; i < extractosActivos.length - 1 ; i++) {
      
      if ( extractosActivos[i].innerHTML.trim() === sentencia.extractolatino.trim() ) {
        extracto = sentencia.extractolatino;
        break;
      }

      if ( extractosActivos[i].innerHTML.trim() === sentencia.extractoespanol.trim() ) {
        extracto = sentencia.extractoespanol;
        break;
      }

      if ( extractosActivos[i].innerHTML.trim() === sentencia.extractoingles.trim() ) {
        extracto = sentencia.extractoingles;
        break;
      }

    }

    this.socialSharing.share(`« ${ extracto } »`, 'SententiApp', null, 'https://iatext.ulpgc.es/es/aplicaciones');
  }

}