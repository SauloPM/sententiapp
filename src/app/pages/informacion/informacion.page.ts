import { Component      } from '@angular/core';
import { NavController  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Fecha     } from '../../interfaces/fecha';
import { Modal     } from '../../interfaces/modal';
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
    descripcion: 'Esta sentencia no contiene ninguna descripción.',
    imagen: ''
  };
  
  otrasFechas   : Fecha    [] = [];
  sentencias    : Sentencia[] = [];
  datosSentencia: Modal    [] = [];

  mostrarModal: boolean = false;

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
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      }
    }
  }

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor(private activatedRoute: ActivatedRoute, private servicioFechas: FechasService, private navController: NavController) {

    // Guardamos en una variable todas las fechas
    this.servicioFechas.getFechas().subscribe( ( data: Fecha[]) => {
      this.otrasFechas = data;
    });

    // Obtenemos los parámetros de la URL (en este caso solo es el id de la fecha)
    this.activatedRoute.params.subscribe( parametroURL => {

      // Guardamos en una variable los datos de la fecha cuyo ID se encuentra en la URL
      this.servicioFechas.getDatosFecha( parametroURL.id ).subscribe( (data: Fecha[]) => {
        this.fecha = data[0];
      });

      // Guardamos en una variable las sentencias de la fecha cuyo ID se encuentra en la URL
      this.servicioFechas.getSentencias( parametroURL.id ).subscribe( ( data: Sentencia[] ) => {
        this.sentencias = data;
      });
    });
  }

  // Abrir modal
  abrirModal(id: number) {
    this.servicioFechas.getDatosSentencia( id ).subscribe( ( data: Modal[] ) => {
      
      // Guardamos en una variable los datos de la sentencia seleccionada
      this.datosSentencia = data;
      
      // Mostramos el modal
      this.mostrarModal = true;
    });
  }

  // Cerrar modal
  cerrarModal() {
    this.mostrarModal = false;
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