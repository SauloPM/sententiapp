import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { FechasService } from '../../services/fechas.service';

// Interfaces
import { Fecha } from '../../interfaces/fecha';

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent implements OnInit {

  id: number;
  fechas: Fecha[];

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

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private servicioFechas: FechasService ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe( parametrosURL => {

      // Almacenamos los parámetros de la URL
      this.id = parametrosURL.id == undefined ? -1 : parseInt(parametrosURL.id, 10);

      // Obtenemos todas las fechas menos la actual
      this.servicioFechas.getFechas().subscribe( data => {
        this.fechas = this.id === -1 ? data : data.filter( item => item.id !== this.id );
      });
    });
  }

  seleccionarFecha( fecha: Fecha ) {
    this.router.navigate([ '/informacion', fecha.id, 'Todos' ], { replaceUrl: true });
  }
}
