import { Component, AfterViewChecked } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { Categoria         } from './../../interfaces/categoria';
import { CategoriasService } from './../../services/categorias.service';

@Component({
  selector: 'app-otras-fechas',
  templateUrl: './otras-fechas.component.html',
  styleUrls: ['./otras-fechas.component.scss'],
})
export class OtrasFechasComponent implements AfterViewChecked  {

  // Atributos
  ancho: number;
  categoria: Categoria;
  otrasFechas: Categoria[];

  ngAfterViewChecked () {
    // this.ancho = document.getElementById('hijo1').offsetWidth;
    // document.getElementById('hijo1').style.height = this.ancho + 'px';
  }

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioCategorias: CategoriasService) {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.categoria = this.servicioCategorias.getCategoria( parametroURL.id );
    });
    this.otrasFechas = this.servicioCategorias.getCategoriasAleatorias(this.categoria.id);
  }
}
