import { Component, OnInit } from '@angular/core';

// Servicios
import { FavoritosService } from '../../services/favoritos.service'

// Interfaces
import { Sentencia } from 'src/app/interfaces/sentencia';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html'
})
export class FavoritosPage implements OnInit {

  sentenciasFavoritas: Sentencia[] = [];

  constructor( public favoritosService: FavoritosService ) { }

  ngOnInit() { }

}
