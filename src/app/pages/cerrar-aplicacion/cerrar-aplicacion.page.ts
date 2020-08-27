import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cerrar-aplicacion',
  templateUrl: './cerrar-aplicacion.page.html'
})
export class CerrarAplicacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
    navigator['app'].exitApp();
  }
}