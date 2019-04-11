import { Component         } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { Categoria         } from './../interfaces/categoria';
import { CategoriasService } from './../services/categorias.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage {

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
