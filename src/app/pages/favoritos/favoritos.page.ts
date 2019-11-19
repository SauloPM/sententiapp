import { Sentencia } from './../../interfaces/sentencia';
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Fecha } from 'src/app/interfaces/fecha';

// Servicios
import { FechasService    } from './../../services/fechas.service';
import { FavoritosService } from './../../services/favoritos.service';

// jQuery
declare var $: any;

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html'
})
export class FavoritosPage implements OnInit {

  fechas: Fecha[];
  vacio: boolean = true;
  favoritos : Sentencia[];
  reacciones: string[] = [ 'Todos', 'Me gusta', 'Me encanta', 'Me divierte', 'No me gusta' ];
  reaccionSeleccionada: string = 'Todos';

  configuracion = {
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    autoHeight: true,
    pagination: false,
    navigation: false
  };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicioFechas: FechasService, public servicioFavoritos: FavoritosService ) {}
  
  ngOnInit() {

    // Obtenemos todas las fechas
    this.servicioFechas.getFechas().subscribe( data => {
      this.fechas = data;
    });

    setTimeout( () => {
      this.favoritos = this.servicioFavoritos.favoritos;
      this.vacio = this.favoritos === undefined ? true : this.favoritos.length === 0 ? true : false;
    }, 500);

    // Seleccionar categoría del filtro
    $(document).on('click', '.filtro .item', function() {
      $('.filtro .item.seleccionado').removeClass('seleccionado');
      $(this).addClass('seleccionado');
    });

  }

  cambiarReaccion( reaccion: string ) {
    this.reaccionSeleccionada = reaccion;
    this.favoritos = reaccion === 'Todos' ? this.servicioFavoritos.favoritos : this.servicioFavoritos.favoritos.filter( item => item.reaccion === reaccion );
    this.vacio = this.favoritos === undefined ? true : this.favoritos.length === 0 ? true : false;
  }

  actualizarFavoritos() {
    this.favoritos = this.reaccionSeleccionada === 'Todos' ? this.servicioFavoritos.favoritos : this.servicioFavoritos.favoritos.filter( item => item.reaccion === this.reaccionSeleccionada )
    this.vacio = this.favoritos === undefined ? true : this.favoritos.length === 0 ? true : false;
  }
}
