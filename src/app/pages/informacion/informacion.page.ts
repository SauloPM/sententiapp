import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FechasService  } from '../../services/fechas.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage {

  fecha: Fecha = {
    id: 0,
    etiqueta: '',
    descripcion: '',
    imagen: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private servicioFechas: FechasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.servicioFechas.getFecha( parametroURL.id ).subscribe( (data: Fecha[]) => {
        this.fecha = data[0];
      });
    });
  }
}

export interface Fecha {
  id: number;
  etiqueta: string;
  descripcion: string;
  imagen: string;
}
