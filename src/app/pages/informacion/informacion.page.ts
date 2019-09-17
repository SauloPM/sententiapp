import { Component      } from '@angular/core';
import { NavController  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Fecha     } from '../../interfaces/fecha';
import { Sentencia } from '../../interfaces/sentencia';

// Servicios
import { FechasService } from '../../services/fechas.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html'
})
export class InformacionPage {

  fecha: Fecha = {
    id: 0,
    etiqueta: '',
    descripcion: '',
    imagen: ''
  };
  
  otrasFechas: Fecha    [] = [];
  sentencias : Sentencia[] = [];

  // Configuración del carrusel
  opcionesSlider = {
    pagination: false,
    spaceBetween: 5,
    slidesPerView: 5,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      400: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      }
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private servicioFechas: FechasService, private navController: NavController) {

    // Guardamos en una variable todas las fechas
    this.servicioFechas.getFechas().subscribe( (data: Fecha[]) => {
      this.otrasFechas = data;
    });

    // Obtenemos los parámetros de la URL (en este caso solo es el id de la fecha)
    this.activatedRoute.params.subscribe( parametroURL => {

      // Guardamos en una variable los datos de la fecha cuyo ID se encuentra en la URL
      this.servicioFechas.getFecha( parametroURL.id ).subscribe( (data: Fecha[]) => {
        this.fecha = data[0];
      });

      // Guardamos en una variable las sentencias de la fecha cuyo ID se encuentra en la URL
      this.servicioFechas.getSentencias( parametroURL.id ).subscribe( ( data: Sentencia[] ) => {
        this.sentencias = data;
      });
    });
  }

  // Volver a la página anterior
  volverAtras() {
    this.navController.back();
  }

  // Volver a la página de inicio
  volverInicio() {
    this.navController.navigateBack('/');
  }
}