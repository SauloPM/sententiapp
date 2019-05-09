import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { Fecha             } from '../../interfaces/fechas';
import { FechasService     } from '../../services/fechas.service';

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent {

  // Atributos
  ancho: number;
  fecha: any;
  otrasFechas: any[];

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioFechas: FechasService) {

    // Obtenemos los datos necesarios de la fecha cuyo ID fue pasado por parámetro
    this.activatedRoute.params.subscribe( parametroURL => {
      this.fecha = this.servicioFechas.getFecha( parametroURL.id );

      // Obtenemos tres fechas aleatorias sin ser la que estamos cargando
      this.servicioFechas.getFechas().subscribe( (data: any[]) => {
        this.otrasFechas = this.servicioFechas.getFechasAleatorias(this.fecha.id, data);
      });
    });
  }
}
