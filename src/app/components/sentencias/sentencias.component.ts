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

  deviceID: string = '74a1eb27';

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

    this.resaltarReacciones();

    await this.uniqueDeviceID.get()
      .then (( uuid : any ) => { 
        this.deviceID = uuid;
        console.log( 'ID único del dispositivo » ' + uuid );
      })
      .catch(( error: any ) => console.log( error ));

  }

  guardarFavorito( sentencia: Sentencia, reaccion: string ) {

    this.uniqueDeviceID.get()
      .then (( uuid : any ) => console.log( uuid  ))
      .catch(( error: any ) => console.log( error ));

    // Actualizamos la reacción de la sentencia dentro de la página
    sentencia.reaccion = reaccion;

    // const EXISTE = this.servicioFavoritos.existeFavorito( sentencia );

    // Si no existe, se crea
    // if ( !EXISTE )
      // this.servicioFavoritos.crearFavorito( sentencia, this.deviceID );
      
    // Si sí existe, se actualiza la rección
    // else
    //   this.servicioFavoritos.actualizarFavorito( sentencia );

    // Refrescamos (solo en la página de favoritos)
    // this.favoritoSeleccionado.emit( this.sentencias );

    this.servicioFavoritos.crearFavorito( sentencia, this.deviceID ).subscribe(
      respuesta => {
        console.log( respuesta );
      },
      error => {
        console.log( error );
      }
    );

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
