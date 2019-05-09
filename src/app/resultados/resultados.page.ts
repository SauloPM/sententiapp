import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { FechasService     } from '../services/fechas.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage {

  secuencia: string;
  fechasEncontradas: any[];

  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: FechasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      
      this.secuencia = parametroURL.secuencia;
      
      this.servicioCategorias.getFechas().subscribe( ( data: any[] ) => {
        this.fechasEncontradas = this.servicioCategorias.buscarFecha(parametroURL.secuencia, data);
      });
    });
  }
}
