import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fecha          } from '../interfaces/fechas';
import { FechasService  } from '../services/fechas.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage {

  // Atributos
  fecha: Fecha;

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: FechasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.fecha = this.servicioCategorias.getFecha( parametroURL.id );
    });
  }
}
