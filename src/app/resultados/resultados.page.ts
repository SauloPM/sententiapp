import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { Fecha             } from '../interfaces/fechas';
import { FechasService     } from '../services/fechas.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage {

  // Atributos
  secuencia: string;
  fechasEncontradas: Fecha[];

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: FechasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.secuencia = parametroURL.secuencia;
      this.fechasEncontradas = this.servicioCategorias.buscarFechas(parametroURL.secuencia);
    });
  }
}
