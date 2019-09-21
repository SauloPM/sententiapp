import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

// Servicios
import { FechasService  } from '../../services/fechas.service';

// Interfaces
import { Modal     } from '../../interfaces/modal';
import { Sentencia } from '../../interfaces/sentencia';

@Component({
  selector: 'app-sentencias',
  templateUrl: './sentencias.component.html',
  styleUrls: ['./sentencias.component.scss'],
})
export class SentenciasComponent {

  id          : number      = 0;
  sentencias  : Sentencia[] = [];
  traducciones: Modal    [] = [];

  configuracion = {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    autoHeight: true,
    slideToClickedSlide: true,
    pagination: false,
    navigation: false
  };

  constructor( private activatedRoute: ActivatedRoute, private servicioFechas: FechasService, private actionSheetController: ActionSheetController ) {

    // Obtenemos los parámetros de la URL (en este caso solo es el id de la fecha)
    this.activatedRoute.params.subscribe( parametroURL => {

      this.id = parametroURL.id;

      // Guardamos en una variable las sentencias de la fecha cuyo ID se encuentra en la URL
      this.servicioFechas.getSentencias( parametroURL.id ).subscribe( ( data: Sentencia[] ) => {
        
        this.sentencias = data;

        this.sentencias.forEach( element => {
          
          this.servicioFechas.getDatosSentencia( element.id ).subscribe( ( data ) => {
            
            // Guardamos en una variable los datos de la sentencia seleccionada
            this.traducciones.push(data[0]);

          });
        });
      });
    });
  }

  async abrirMenu() {

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Guardar',
        icon: 'star',
        handler: () => {
          console.log('Guardar clicked');
        }
      }, {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Compartir clicked');
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
