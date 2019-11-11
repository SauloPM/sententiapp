import { Component, OnInit, Input } from '@angular/core';

// Servicios
import { FechasService    } from '../../services/fechas.service';
import { FavoritosService } from '../../services/favoritos.service';

// Interfaces
import { Sentencia } from '../../interfaces/sentencia';

// Compartir en RRSS
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-sentencias',
  templateUrl: './sentencias.component.html',
  styleUrls: ['./sentencias.component.scss'],
})
export class SentenciasComponent implements OnInit {

  @Input() sentencias: Sentencia[] = [];

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
    private servicioFechas: FechasService,
    private servicioFavoritos: FavoritosService ) { }

  ngOnInit() {
    
    // Resaltamos las sentencias favoritas
    this.sentencias.forEach( ( sentencia ) => {
      sentencia.esFavorito = this.esFavorito( sentencia.id );
    });
    
  }

  abrirEstados( i: number ) {

    let barraEstados    = document.getElementById(`barra-estados-${ i }`);
    let estadosAbiertos = getComputedStyle( barraEstados, null ).display;

    barraEstados.style.display = estadosAbiertos === 'block' ? 'none' : 'block';

  }

  guardarFavorito( sentencia: Sentencia ) {
    sentencia.esFavorito = true;
    this.servicioFavoritos.guardarFavoritos( sentencia );
  }

  eliminarFavorito ( sentencia: Sentencia ) {
    sentencia.esFavorito = false;
    this.servicioFavoritos.eliminarFavorito( sentencia.id );
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

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  esFavorito( id: number ) {
    return this.servicioFavoritos.existe( id );
  }
}
