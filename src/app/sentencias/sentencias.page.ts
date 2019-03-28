import { Component } from '@angular/core';

// Paso de parámetros a través de la URL
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Categoria } from './../interfaces/categoria';

// Servicios
import { CategoriasService } from './../services/categorias.service';

@Component({
  selector: 'app-sentencias',
  templateUrl: './sentencias.page.html',
  styleUrls: ['./sentencias.page.scss'],
})
export class SentenciasPage {

  // Atributos de clase
  posicion  : number = 0;
  categoriaSeleccionada : Categoria;
  categorias: Categoria[];
  sentencias: string[];

  constructor(private activatedRoute: ActivatedRoute, private _categoriaService: CategoriasService) {

    // Almacenamos las categorías
    this.showCategorias();
  }

  showCategorias() {
    this._categoriaService.getCategorias().subscribe(
      respuesta => {
        this.categorias = respuesta['categorias'];

        // Almacenamos el parámetro de la URL
        this.activatedRoute.params.subscribe( parametroURL => {
          this.posicion = parametroURL['id'];
          this.categoriaSeleccionada = this.categorias[this.posicion];
          this.sentencias = this.categoriaSeleccionada.sentencias;
        });
      }
    );
  }
}
