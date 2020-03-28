import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Servicios
import { UsuariosService  } from '../../services/usuarios.service';
import { FavoritosService } from '../../services/favoritos.service';

// Interfaces
import { Sentencia } from '../../interfaces/sentencia';

// Compartir en RRSS
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

// jQuery
declare var $: any;

@Component({
  selector: 'app-sentencias',
  templateUrl: './sentencias.component.html',
  styleUrls: ['./sentencias.component.scss'],
})
export class SentenciasComponent implements OnInit {

  @Input() sentencias: Sentencia[];

  @Output() dispararRefrescarListadoDeSentenciasFavoritas: EventEmitter<any>;

  usuarioID: string;

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

  constructor( private socialSharing: SocialSharing, private servicioFavoritos: FavoritosService, private usuariosService: UsuariosService ) {
    this.dispararRefrescarListadoDeSentenciasFavoritas = new EventEmitter();
  }

  async ngOnInit() {

    // Almacenamos en una variable el ID del usuario
    await this.usuariosService.getUsuarioID().then(
      data  => this.usuarioID = data,
      error => console.log( error )
    );

    // Almacenamos en una variable las sentencias a las que el usuario reaccionó
    this.servicioFavoritos.getSentencias().subscribe(( data: any ) => {

      this.sentenciasFirebase = data;
      
      this.resaltarSentencias();

      // Refrescamos (solo en la página de favoritos)
      this.dispararRefrescarListadoDeSentenciasFavoritas.emit();
    });
  }

  async guardarFavorito( sentencia: Sentencia, reaccion: string ) {

    if ( this.usuarioID === '-1' ) {
      await this.usuariosService.crearUsuario();
      await this.usuariosService.getUsuarioID().then(
        data  => this.usuarioID = data,
        error => console.log( 'Se ha producido un error' )
      );
    }

    if ( this.usuarioID === '-1' ) {
      return;
    }

    sentencia.reaccion = reaccion;
    
    // ¿Habíamos reaccionado previamente a la sentencia a la que acabamos de reaccionar?
    const EXISTE = this.sentenciasFirebase.find( item => item.id_dispositivo === this.usuarioID && item.id_sentencia === sentencia.id );

    // En caso negativo, se crea en Firebase un nuevo registro para alojar la nueva sentencia favorita
    if ( !EXISTE ) {
      this.servicioFavoritos.crear( sentencia.id, this.usuarioID, reaccion );
    }

    // En caso positivo, se actualiza en Firebase la reacción del registro correspondiente
    else {
      sentencia.reaccion = reaccion;
      this.servicioFavoritos.actualizar( sentencia.id, this.usuarioID, reaccion );
    }
  }

  eliminarFavorito ( sentencia: Sentencia, reaccion: string ) {

    sentencia.reaccion = '';
    this.servicioFavoritos.eliminar( this.usuarioID, sentencia.id );

  }

  compartir( sentencia: Sentencia ) {

    let extracto = sentencia.extractolatino;
    let extractosActivos = document.getElementsByClassName( 'extracto swiper-slide-active' );

    // Detectamos qué traducción del extraco se desea compartir
    for (let i = 0; i < extractosActivos.length; i++) {
      
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

    console.log( this.usuarioID );

    let busqueda: any;
    let misFavoritos = this.sentenciasFirebase.filter( item => item.id_dispositivo === this.usuarioID );

    this.sentencias.forEach(( sentencia ) => {

      // Resaltamos la reacción
      busqueda = misFavoritos.find( item => item.id_dispositivo === this.usuarioID && item.id_sentencia === sentencia.id );

      if ( busqueda != undefined ) sentencia.reaccion = busqueda.reaccion;

      // Ajustamos los recuentos
      let recuentoMeGusta    = this.sentenciasFirebase.filter( item => item.id_sentencia === sentencia.id && item.reaccion === 'me-gusta'    );
      let recuentoMeEncanta  = this.sentenciasFirebase.filter( item => item.id_sentencia === sentencia.id && item.reaccion === 'me-encanta'  );
      let recuentoMeDivierte = this.sentenciasFirebase.filter( item => item.id_sentencia === sentencia.id && item.reaccion === 'me-divierte' );
      let recuentoNoMeGusta  = this.sentenciasFirebase.filter( item => item.id_sentencia === sentencia.id && item.reaccion === 'no-me-gusta' );

      if ( recuentoMeGusta    != undefined ) sentencia.recuentoMeGusta    = recuentoMeGusta   .length = recuentoMeGusta   .length;
      if ( recuentoMeEncanta  != undefined ) sentencia.recuentoMeEncanta  = recuentoMeEncanta .length = recuentoMeEncanta .length;
      if ( recuentoMeDivierte != undefined ) sentencia.recuentoMeDivierte = recuentoMeDivierte.length = recuentoMeDivierte.length;
      if ( recuentoNoMeGusta  != undefined ) sentencia.recuentoNoMeGusta  = recuentoNoMeGusta .length = recuentoNoMeGusta .length;
    });
  }
}
