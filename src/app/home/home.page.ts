import { Component } from '@angular/core';
import { debug } from 'util';
import { url } from 'inspector';

// Servicios
import { CategoriasService } from './../services/categorias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Atributos de clase
  categorias: Categoria[];

  constructor(private servicio: CategoriasService) {
    this.showCategorias();
  }

  showCategorias() {
    this.servicio.getCategorias().subscribe(
      respuesta => {
        this.categorias = respuesta['categorias'];
      }
    );
  }

  anterior() {

    let indice  : number = 0;
    let posicion: number = 0;

    // Buscamos la posición de la categoría activa
    this.categorias.forEach(categoria => {
      if (categoria.display === 'block')
        posicion = indice;
      indice++;
    });

    // Desactivamos la categoría activa
    this.categorias[posicion].display = 'none';

    // Decrementamos la posición
    posicion = ( posicion === 0 ) ? this.categorias.length - 1 : posicion - 1;

    // Activamos la categoría anterior
    this.categorias[posicion].display = 'block';
  }

  siguiente() {

    let indice  : number = 0;
    let posicion: number = 0;

    // Buscamos la posición de la categoría activa
    this.categorias.forEach(categoria => {
      if (categoria.display === 'block')
        posicion = indice;
      indice++;
    });

    // Desactivamos la categoría activa
    this.categorias[posicion].display = 'none';

    // Decrementamos la posición
    posicion = ( posicion === this.categorias.length - 1 ) ? 0 : posicion + 1;

    // Activamos la categoría anterior
    this.categorias[posicion].display = 'block';
  }
}

interface Categoria {
  titulo: string;
  imagen: string;
  informacion: string;
  display: string;
}
