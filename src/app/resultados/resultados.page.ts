import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { Categoria         } from './../interfaces/categoria';
import { CategoriasService } from './../services/categorias.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage {

  // Atributos
  secuencia: string;
  fechasEncontradas: Categoria[];

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: CategoriasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.secuencia = parametroURL.secuencia;
      this.fechasEncontradas = this.servicioCategorias.buscarFechas(parametroURL.secuencia);
    });
  }
}
