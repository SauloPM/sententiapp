import { Component, Input } from '@angular/core';

// Servicios
import { FechasService  } from '../../services/fechas.service';

// Interfaces
import { Fecha } from '../../interfaces/fecha';

// jQuery
declare var $: any;

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent {

  @Input() id: number;

  fechas: Fecha[] = [];

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
      768: {
        slidesPerView: 3,
      }
    }
  }

  constructor( private servicioFechas: FechasService ) {
    
    // Guardamos en una variable todas las fechas
    this.servicioFechas.getFechas().subscribe( ( data: Fecha[]) => {
      this.fechas = data;
    });
  }
}
