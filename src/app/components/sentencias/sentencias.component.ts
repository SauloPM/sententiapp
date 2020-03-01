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

  favoritos: any;

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
    
    this.servicioFavoritos.getSentencias().subscribe(( data: any ) => {
      this.favoritos = data;
      console.log( data );
    });
  }

  async ngOnInit() {

    this.resaltarReacciones();

    /*await this.uniqueDeviceID.get()
      .then (( uuid : any ) => { 
        this.deviceID = uuid;
        console.log( 'ID único del dispositivo » ' + uuid );
      })
      .catch(( error: any ) => console.log( error ));*/

  }

  async guardarFavorito( sentencia: Sentencia, reaccion: string ) {

    // Obtenemos el ID de nuestro smartphone
    await this.uniqueDeviceID.get()
      .then (( data : any ) => this.deviceID = data       )
      .catch(( error: any ) => this.deviceID = '74a1eb27' );

    const EXISTE = this.favoritos.find( item => item.id_dispositivo === this.deviceID && item.id_sentencia === sentencia.id );

    // Si no existe, se crea
    if ( !EXISTE ) {
      console.log( `La sentencia ${ sentencia.id } no existe` );
      // this.servicioFavoritos.crearFavorito( sentencia, this.deviceID );
    }
      
    // Si sí existe, se actualiza la rección
    else {
      console.log( `La sentencia ${ sentencia.id } sí existe` );
      // this.servicioFavoritos.actualizarFavorito( sentencia );
    }

    // Refrescamos (solo en la página de favoritos)
    // this.favoritoSeleccionado.emit( this.sentencias );
  }

  eliminarFavorito ( sentencia: Sentencia ) {

    sentencia.reaccion = '';
    this.servicioFavoritos.eliminarFavorito( sentencia );

    // Refrescamos (solo en la página de favoritos)
    this.favoritoSeleccionado.emit( this.sentencias );

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

  resaltarReacciones() {
    this.sentencias.forEach( ( sentencia ) => {
      sentencia.reaccion = this.servicioFavoritos.getReaccion( sentencia.id );
    });
  }
}
