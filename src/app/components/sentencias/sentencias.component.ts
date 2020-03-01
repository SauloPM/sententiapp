import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Servicios
import { FavoritosService } from '../../services/favoritos.service';

// Interfaces
import { Sentencia } from '../../interfaces/sentencia';

// Compartir en RRSS
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

// Obtener ID único del dispositivo
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-sentencias',
  templateUrl: './sentencias.component.html',
  styleUrls: ['./sentencias.component.scss'],
})
export class SentenciasComponent implements OnInit {

  @Input() sentencias: Sentencia[];

  @Output() favoritoSeleccionado: EventEmitter<Sentencia[]>;

  deviceID: string;

  sentenciasFirebase: any;

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

  constructor( private socialSharing: SocialSharing, private servicioFavoritos: FavoritosService, private uniqueDeviceID: UniqueDeviceID ) {
    
    this.favoritoSeleccionado = new EventEmitter();
    
  }

  async ngOnInit() {

    await this.uniqueDeviceID.get()
      .then (( data : any ) => this.deviceID = data       )
      .catch(( error: any ) => this.deviceID = '74a1eb27' );

    this.servicioFavoritos.getSentencias().subscribe(( data: any ) => {

      this.sentenciasFirebase = data;
      
      this.resaltarSentencias();
      
    });
  }

  guardarFavorito( sentencia: Sentencia, reaccion: string ) {

    // Obtenemos el ID de nuestro smartphone
    const EXISTE = this.sentenciasFirebase.find( item => item.id_dispositivo === this.deviceID && item.id_sentencia === sentencia.id );

    // Si no existe, se crea
    if ( !EXISTE ) {
      this.servicioFavoritos.crear( sentencia.id, this.deviceID, reaccion );
    }

    // Si existe, se actualiza la reacción
    else {
      this.servicioFavoritos.actualizar( sentencia.id, this.deviceID, reaccion );
    }

    // Refrescamos (solo en la página de favoritos)
    // this.favoritoSeleccionado.emit( this.sentencias );
  }

  eliminarFavorito ( sentencia: Sentencia ) {

    this.servicioFavoritos.eliminar( this.deviceID, sentencia.id );

    // Refrescamos (solo en la página de favoritos)
    // this.favoritoSeleccionado.emit( this.sentencias );

  }

  compartir( sentencia: Sentencia ) {

    let extracto = sentencia.extractolatino;
    let extractosActivos = document.getElementsByClassName('extracto swiper-slide-active');

    // Detectamos qué traducción del extraco se desea compartir
    for (let i = 0; i < extractosActivos.length ; i++) {
      
      if ( extractosActivos[i].textContent.trim() === sentencia.extractolatino.trim() ) {
        extracto = sentencia.extractolatino;
        break;
      }

      if ( extractosActivos[i].textContent.trim() === sentencia.extractoespanol.trim() ) {
        extracto = sentencia.extractoespanol;
        break;
      }

      if ( extractosActivos[i].textContent.trim() === sentencia.extractoingles.trim() ) {
        extracto = sentencia.extractoingles;
        break;
      }
    }

    this.socialSharing.share(
      `« ${ extracto } »\n- ${ sentencia.autor }\n`, 'SententiApp', null, 'https://iatext.ulpgc.es/es/aplicaciones');
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  resaltarSentencias() {

    let busqueda: any;
    let misFavoritos = this.sentenciasFirebase.filter( item => item.id_dispositivo === this.deviceID );

    this.sentencias.forEach(( sentencia ) => {

      busqueda = misFavoritos.find( item => item.id_dispositivo === this.deviceID && item.id_sentencia === sentencia.id );

      sentencia.reaccion = busqueda != undefined ? busqueda.reaccion : '';

    });

    console.log( 'Sentencias de la fecha seleccionada' );
    console.log( this.sentencias );
    console.log( '───────────────────────────────────────────────────────────────────' );

    console.log( 'Sentencias almacenadas en la BD' );
    console.log( this.sentenciasFirebase );
    console.log( '───────────────────────────────────────────────────────────────────' );

    console.log( 'Sentencias favoritas' );
    console.log( misFavoritos );
    console.log( '───────────────────────────────────────────────────────────────────' );
  }
}
