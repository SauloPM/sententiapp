import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FechasService  } from '../../services/fechas.service';

@Component({
  selector: 'app-sentencias',
  templateUrl: './sentencias.page.html',
  styleUrls: ['./sentencias.page.scss'],
})
export class SentenciasPage {

  id: number = 0;
  fecha: Fecha = {
    etiqueta: '',
    extractolatino: '',
  };
  fechas: Fecha[] = [];

  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: FechasService) {
    this.activatedRoute.params.subscribe( parametroURL => {

      this.id = parametroURL.id;

        this.servicioCategorias.getSentencias( parametroURL.id ).subscribe( ( data: Fecha[] ) => {
          this.fecha = data[0];
          this.fechas = data;
        });
    });
  }
}

export interface Fecha {
  etiqueta: string;
  extractolatino: string;
}
