import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor( private http: HttpClient ) {
    console.log('Servicio de categorías listo para ser utilizado');
    this.getCategorias();
  }

  getCategorias() {
    return this.http.get('assets/data/categorias.json');
  }
}
