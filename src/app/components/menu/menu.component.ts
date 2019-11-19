import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @ViewChild('menu') menu: ElementRef;
  @ViewChild('botonMenu') botonMenu: ElementRef;

  @ViewChildren('texto') texto: any;

  estado: string = 'cerrado';

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private router: Router ) { }

  items = [
    {
      texto: 'Inicio',
      enlace: 'home',
      icono: 'home'
    },
    {
      texto: 'Mis sentencias',
      enlace: 'favoritos',
      icono: 'star'
    }
  ];

  ngOnInit() {}

  mostrarMenu() {

    let menu = this.menu.nativeElement;

    const ABIERTO = menu.attributes['data-estado'].nodeValue === 'abierto' ? true : false;
    
    if ( ABIERTO )
      this.cerrarMenu();
    else
      this.abrirMenu();

  }

  navegar( enlace: string ) {
    
    this.cerrarMenu();

    setTimeout( () => {
      this.router.navigate( [ `/${ enlace }` ] );
    }, 1000);

  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  abrirMenu() {

    let menu = this.menu.nativeElement;

    menu.style.zIndex = '50';
    menu.style.backgroundColor = 'rgba(255,255,255,.75)';

    this.botonMenu.nativeElement.className = 'boton abierto';

    setTimeout(() => {
      this.menu.nativeElement.attributes['data-estado'].nodeValue = 'abierto';
    }, 250);

    setTimeout(() => {
      this.texto.first.nativeElement.style.opacity = '1';
    }, 500);

    setTimeout(() => {
      this.texto.last.nativeElement.style.opacity = '1';
    }, 650);
  }

  cerrarMenu() {

    let menu = this.menu.nativeElement;

    this.texto.first.nativeElement.style.opacity = '0';

    setTimeout(() => {
      this.texto.last.nativeElement.style.opacity = '0';
    }, 150);

    setTimeout(() => {
      this.menu.nativeElement.attributes['data-estado'].nodeValue = 'cerrado';
    }, 400);
    
    setTimeout(() => {
      menu.style.backgroundColor = 'transparent';
      this.botonMenu.nativeElement.className = 'boton';
    }, 650);

    setTimeout(() => {
      menu.style.zIndex = '-1';
    }, 900);
  }

}
