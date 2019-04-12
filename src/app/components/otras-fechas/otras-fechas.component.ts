import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { Categoria         } from './../../interfaces/categoria';
import { CategoriasService } from './../../services/categorias.service';

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent {

  // Atributos
  categoria: Categoria;
  otrasFechas: Categoria[];

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: CategoriasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.categoria = this.servicioCategorias.getCategoria( parametroURL.id );
    });
    this.otrasFechas = this.servicioCategorias.getCategoriasAleatorias(this.categoria.id);
  }
}
