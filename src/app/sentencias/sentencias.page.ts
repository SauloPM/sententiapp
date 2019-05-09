import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fecha          } from '../interfaces/fechas';
import { FechasService  } from '../services/fechas.service';

@Component({
  selector: 'app-sentencias',
  templateUrl: './sentencias.page.html',
  styleUrls: ['./sentencias.page.scss'],
})
export class SentenciasPage {

  // Atributos
  fecha: Fecha;
  otrasFechas: Fecha[];

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: FechasService) {
    // this.activatedRoute.params.subscribe( parametroURL => {
    //   this.fecha = this.servicioCategorias.getFecha( parametroURL.id );
    // });

    // this.otrasFechas = this.servicioCategorias.getFechasAleatorias(this.fecha.id);
  }
}
