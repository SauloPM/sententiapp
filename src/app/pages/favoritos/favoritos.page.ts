import { Component, OnInit } from '@angular/core';

// Servicios
import { FavoritosService } from '../../services/favoritos.service'

// jQuery
declare var $: any;

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html'
})
export class FavoritosPage implements OnInit {

  estados: string[] = [ 'Me gusta', 'Me enamora', 'Me divierte', 'No me gusta' ];

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

  constructor( public servicioFavoritos: FavoritosService ) { }

  ngOnInit() {

    // Seleccionar categoría del filtro
    $(document).on('click', '.filtro .item', function() {
      $('.filtro .item.seleccionado').removeClass('seleccionado');
      $(this).addClass('seleccionado');
    });
  }

  cambiarEstado( estado: string ) {
    // console.log( estado )
  }
}
