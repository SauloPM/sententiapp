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
  fecha: Fecha;
  otrasFechas: Fecha[];

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: FechasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.fecha = this.servicioCategorias.getFecha( parametroURL.id );
    });
    this.otrasFechas = this.servicioCategorias.getFechasAleatorias(this.fecha.id);
  }
}
