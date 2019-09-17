import { Component, OnInit, AfterViewInit } from '@angular/core';

// Servicios
import { FechasService  } from '../../services/fechas.service';

// jQuery
declare var $: any;

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent implements OnInit, AfterViewInit {

  otrasFechas: Fecha[] = [];

  constructor(private servicioFechas: FechasService) {
    
    // Guardamos las fechas en una variable
    this.servicioFechas.getFechas().subscribe( (data: Fecha[]) => {
      this.otrasFechas = data;
    });
  }

  ngOnInit() {
    $(window).on("load", function() {
      $('.owl-carousel').owlCarousel();
    });
  }

  ngAfterViewInit() {
    $(window).on("load", function() {
      $('.owl-carousel').owlCarousel();
    });
  }
}

export interface Fecha {
  id: number;
  etiqueta: string;
  imagen: string;
}
