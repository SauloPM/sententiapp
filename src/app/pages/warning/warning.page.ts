import { Component } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.page.html'
})
export class WarningPage {

  mensaje = 'SententiApp selecciona sentencias de autores clásicos traducidas al español e inglés sobre temas de actualidad como ejemplos de la pervivencia y de la transformación del pensamiento clásico en la sociedad occidental. Léelas, da tu opinión y utilízalas para tus argumentos.';

  aclaracion = 'SententiApp no se hace responsable de las opiniones de los autores antiguos';

  constructor() { }
  
}
