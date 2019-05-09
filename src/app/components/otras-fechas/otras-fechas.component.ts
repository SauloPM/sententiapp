import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { FechasService     } from '../../services/fechas.service';

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent {

  ancho: number = 0;
  fecha: Fecha = {
    id: 0,
    etiqueta: '',
    imagen: ''
  };
  otrasFechas: Fecha[] = [ { id: 0, etiqueta: '', imagen: '' }, { id: 0, etiqueta: '', imagen: '' }, { id: 0, etiqueta: '', imagen: '' } ];

  constructor(private activatedRoute: ActivatedRoute, private servicioFechas: FechasService) {

    this.activatedRoute.params.subscribe( parametroURL => {

      // Almacenamos los datos de la fecha de la URL
      this.servicioFechas.getFecha( parametroURL.id ).subscribe( (data: Fecha) => {
        this.fecha = data[0];
        
        // Obtenemos tres fechas aleatorias
        this.servicioFechas.getFechas().subscribe( (allFechas: Fecha[]) => {
          this.otrasFechas = this.servicioFechas.getFechasAleatorias(this.fecha.id, allFechas);
        });
      });
    });
  }
}

export interface Fecha {
  id: number;
  etiqueta: string;
  imagen: string;
}
