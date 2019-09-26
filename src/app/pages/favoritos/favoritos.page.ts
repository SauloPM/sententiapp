import { Component } from '@angular/core';

// Servicios
import { FavoritosService } from '../../services/favoritos.service'

// Interfaces
import { Sentencia } from 'src/app/interfaces/sentencia';

// Compartir en RRSS
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html'
})
export class FavoritosPage {

  configuracion = {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    autoHeight: true,
    pagination: false,
    navigation: false
  };

  constructor( public servicioFavoritos: FavoritosService, private socialSharing: SocialSharing ) { }

  compartir( extractoLatin: string, extractoEspanol: string ) {
    this.socialSharing.share(`« ${ extractoLatin } » | « ${ extractoEspanol } »`, 'SententiApp', null, 'https://iatext.ulpgc.es');
  }

  eliminarFavorito ( sentencia: Sentencia ) {
    this.servicioFavoritos.eliminarFavorito( sentencia.id )
  }

}
