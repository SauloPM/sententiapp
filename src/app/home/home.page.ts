import { Component, OnInit } from '@angular/core';

// Interfaces
import { Categoria } from './../interfaces/categoria';

// Servicios
import { CategoriasService } from './../services/categorias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categorias: Categoria[];

  constructor(private servicioCategorias: CategoriasService) { }

  ngOnInit() {
    this.categorias = this.servicioCategorias.getCategorias();
  }

  anterior() {
    
    let indice  : number = 0;
    let posicion: number = 0;

    // Buscamos la posición de la categoría activa
    this.categorias.forEach(categoria => {
      if (categoria.display === 'block') {
        posicion = indice;
      }
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
      if (categoria.display === 'block') {
        posicion = indice;
      }
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
