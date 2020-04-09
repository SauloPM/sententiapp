import { ActivatedRoute    } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Fecha     } from '../../interfaces/fecha';
import { Sentencia } from '../../interfaces/sentencia';

// Servicios
import { FechasService } from '../../services/fechas.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html'
})
export class InformacionPage implements OnInit {

  id = 0;
  categoria = 'Todos';

  otrasFechas: Fecha    [];
  sentencias : Sentencia[];

  fecha: Fecha = {
    id: 0,
    etiqueta: '',
    descripcion: 'Esta sentencia no contiene ninguna descripción.',
    imagen: ''
  };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicioFechas: FechasService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    this.getDatos(); // Guardamos en una variable los datos de la fecha actual y en otra las sentencias    
    
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  getDatos() {
    this.activatedRoute.params.subscribe( parametrosURL => {

      // Almacenamos los parámetros de la URL
      this.id        = parseInt(parametrosURL.id, 10);
      this.categoria = parametrosURL.categoria;

      // Obtenemos el título y la descripción de la fecha seleccionada
      this.servicioFechas.getDatosFecha( parametrosURL.id ).subscribe( data => {

        this.fecha = data[0];
        
        // Si nos encontramos en la fecha general
        if ( this.id === 1 ) {
          this.fecha.descripcion = 'Sentencias latinas para diferentes circunstancias sin una fecha determinada asociada.';
        }
      });

      // Obtenemos las sentencias de la fecha seleccionada
      this.servicioFechas.getSentencias( parametrosURL.id ).subscribe( ( data: Sentencia[] ) => {
        this.sentencias = this.categoria === 'Todos' ? data : data.filter ( item => item.categoria === this.categoria );
      });
    });
  }
}
