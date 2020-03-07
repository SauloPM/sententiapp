import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// Interfaces
import { Fecha } from '../../interfaces/fecha';

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent {

  @Input() fechas: Fecha[];

  // Configuración del carrusel
  opcionesSlider = {
    pagination: false,
    spaceBetween: 5,
    slidesPerView: 5,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      }
    }
  };

  constructor( private router: Router ) {}

  seleccionarFecha( fecha: Fecha ) {

    this.router.navigate([ '/informacion', fecha.id, 'Todos' ], { replaceUrl: true });

  }
}
