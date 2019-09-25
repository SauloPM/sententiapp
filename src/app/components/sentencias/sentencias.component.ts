import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

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
    private servicioFavoritos: FavoritosService,
    private actionSheetController: ActionSheetController ) { }

  ngOnInit() {
    
    // Guardamos en una variable las sentencias de la fecha cuyo ID se encuentra en la URL
    this.servicioFechas.getSentencias( this.id ).subscribe( ( data ) => {
      this.sentencias = data;
    });
  }

  guardarFavorito( sentencia: Sentencia ) {
    this.servicioFavoritos.guardarFavoritos( sentencia );
  }

  compartir( extracto: string ) {
    this.socialSharing.share(`« ${ extracto } »`, 'SententiApp', null, 'https://iatext.ulpgc.es');
  }
}
