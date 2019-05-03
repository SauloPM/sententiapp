import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Interfaces
import { Categoria } from './../interfaces/categoria';

// Servicios
import { CategoriasService } from './../services/categorias.service';
import { getElementDepthCount } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categorias: Categoria[];
  buscar: boolean = false;

  fechas: any;

  constructor(private router: Router, private servicioCategorias: CategoriasService, private http: HttpClient) {
    this.http.get('http://localhost:55852/sentencias.asmx/MostrarSentencias').subscribe( data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.fechas = data;
    });
  }

  ngOnInit() {
    this.categorias = this.servicioCategorias.getCategorias();
  }

  // Método que muestra los resultados de la búsqueda
  buscarFecha(secuencia: string) {
  
    // Eliminamos los espacios innecesarios
    secuencia = secuencia.trim();

    // Utilizamos el buscador si la secuenca contiene al menos un carácter
    if (secuencia.trim() === '') {
      this.router.navigate( ['/home'] );
    }
    this.router.navigate( ['/resultados', secuencia] );
  }

  // Método que muestra la categoría anterior
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

  // Método que muestra la categoría siguiente
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
