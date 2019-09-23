import { Component, OnInit, Input } from '@angular/core';

// Servicios
import { FechasService  } from '../../services/fechas.service';

// Interfaces
import { Fecha } from '../../interfaces/fecha';

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent implements OnInit {

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

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicioFechas: FechasService ) { }

  ngOnInit() {

    // Guardamos en una variable todas las fechas
    this.servicioFechas.getFechas().subscribe( ( data: Fecha[]) => {
      this.fechas = data;
    });

  }

}
