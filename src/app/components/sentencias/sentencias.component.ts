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
    slideToClickedSlide: true,
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

  async abrirMenu( sentencia: Sentencia ) {

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Guardar',
        icon: 'star',
        handler: () => {
          console.log('Guardar clicked');
          console.log( sentencia )
          this.servicioFavoritos.guardarFavoritos( this.sentencias[0] );
        }
      }, {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Compartir clicked');
          this.socialSharing.share(`« ${ sentencia.extractolatino } »`, 'SententiApp', 'https://sententiapp.iatext.ulpgc.es/img/spinner.svg', 'https://play.google.com');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar clicked');
        }
      }]
    });

    await actionSheet.present();

  }
}
