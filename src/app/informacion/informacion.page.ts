import { Component } from '@angular/core';

// Paso de parámetros a través de la URL
import { ActivatedRoute } from '@angular/router';

// Servicios
import { CategoriasService } from './../services/categorias.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage {

  // Atributos de clase
  posicion  : number = 0;
  categoriaSeleccionada : Categoria;
  categorias: Categoria[];

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
        });
      }
    );
  }
}

interface Categoria {
  titulo: string;
  imagen: string;
  informacion: string;
  display: string;
}
