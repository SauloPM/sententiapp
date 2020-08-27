import { Router    } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuariosService } from '../../services/usuarios.service';

// jQuery
declare var $: any;

@Component({
  selector: 'app-warning',
  templateUrl: './warning.page.html'
})
export class WarningPage implements OnInit {

  mensaje = 'SententiApp selecciona sentencias de autores clásicos traducidas al español e inglés sobre temas de actualidad como ejemplos de la pervivencia y de la transformación del pensamiento clásico en la sociedad occidental. Léelas, da tu opinión y utilízalas para tus argumentos.';

  aclaracion = 'SententiApp no se hace responsable de las opiniones de los autores antiguos';

  constructor( public router: Router, public servicioUsuarios: UsuariosService ) { }

  async ngOnInit() {

    await this.servicioUsuarios.checkAceptacionDeCondiciones().then(( condicionesAceptadas: boolean ) => {

      if ( condicionesAceptadas ) {
        this.router.navigate([ '/home' ]);
      } else {

        $( '.fondo-blanco' ).css( 'opacity', '0' );

        setTimeout(() => {
          $( '.fondo-blanco' ).css( 'display', 'none' );
        }, 250 );
      }
    });
  }

  aceptarCondiciones() {

    this.servicioUsuarios.guardarAceptacionDeCondicionesEnLocalStorage();
    
    this.router.navigate([ '/home' ]);
  }
}