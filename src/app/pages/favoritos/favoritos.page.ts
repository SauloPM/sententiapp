import { Component } from '@angular/core';

// Servicios
import { FavoritosService } from '../../services/favoritos.service'

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

  constructor( public favoritosService: FavoritosService, private socialSharing: SocialSharing ) { }

  compartir( extracto: string ) {
    console.log(extracto)
    this.socialSharing.share(`« ${ extracto } »`, 'SententiApp', null, 'https://iatext.ulpgc.es');
  }

  eliminarFavorito ( id: number ) {
    this.favoritosService.eliminarFavorito( id )
  }

}
