import { Component } from '@angular/core';

// Servicios
import { FavoritosService } from '../../services/favoritos.service'

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html'
})
export class FavoritosPage {

  constructor( public servicioFavoritos: FavoritosService ) { }

}
