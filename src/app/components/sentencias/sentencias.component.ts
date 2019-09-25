import { Component, OnInit, Input } from '@angular/core';

// Servicios
import { FechasService    } from '../../services/fechas.service';
import { FavoritosService } from '../../services/favoritos.service'

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

  @Input() id: number = 0;

  sentencias  : Sentencia[] = [];

  configuracion = {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    autoHeight: true,
    pagination: false,
    navigation: false
  };

  constructor(
    private socialSharing: SocialSharing,
    private servicioFechas: FechasService,
    private servicioFavoritos: FavoritosService ) { }

  ngOnInit() {
    
    this.servicioFechas.getSentencias( this.id ).subscribe( ( data ) => {

      // Guardamos en una variable las sentencias de la fecha cuyo ID se encuentra en la URL
      this.sentencias = data;

      // Marcamos las sentencias favoritas
      this.sentencias.forEach( ( sentencia ) => {
        sentencia.esFavorito = this.esFavorito( sentencia.id );
      });
    });
  }

  guardarFavorito( sentencia: Sentencia ) {
    sentencia.esFavorito = true;
    this.servicioFavoritos.guardarFavoritos( sentencia );
  }

  eliminarFavorito ( id: number ) {
    this.servicioFavoritos.eliminarFavorito( id )
  }

  esFavorito( id: number ) {
    return this.servicioFavoritos.existe( id );
  }

  compartir( extracto: string ) {
    this.socialSharing.share(`« ${ extracto } »`, 'SententiApp', null, 'https://iatext.ulpgc.es');
  }
  
}
