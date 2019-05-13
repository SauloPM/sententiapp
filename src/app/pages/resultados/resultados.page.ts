import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { FechasService     } from '../../services/fechas.service';

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

      this.servicioCategorias.getResultadosBusqueda( this.secuencia ).subscribe( ( data: any[] ) => {
        console.log(data);
        this.fechasEncontradas = data;
      });
    });
  }
}
