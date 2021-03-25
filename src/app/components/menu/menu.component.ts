import { Router } from '@angular/router';
import { Component } from '@angular/core';

// jQuery
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

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
    },
  ];

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private router: Router ) {}

  mostrarMenu() {

    const MENU_ABIERTO = $( '#menu' ).attr( 'data-estado' ) === 'abierto' ? true : false;

    if ( MENU_ABIERTO ) {
      this.cerrarMenu();
    } else {
      this.abrirMenu();
    }
  }

  navegar( enlace: string ) {
    
    this.cerrarMenu();

    setTimeout( () => {
      this.router.navigate([ `/${ enlace }` ]);
    }, 1150);

  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  abrirMenu() {

    $( '#menu' ).css( 'display', 'block' );
    $( '#menu' ).css( 'background-color', 'rgba(255,255,255,.75)' );

    $( '.boton' ).addClass( 'abierto' );

    setTimeout(() => {
      $( '#menu' ).attr( 'data-estado', 'abierto' );
    }, 250);

    setTimeout(() => {
      $( '#menu .item:nth-child(1) .texto' ).css( 'opacity', '1' );
    }, 400);

    setTimeout(() => {
      $( '#menu .item:nth-child(2) .texto' ).css( 'opacity', '1' );
    }, 550);

    setTimeout(() => {
      $( '#menu .item:nth-child(3) .texto' ).css( 'opacity', '1' );
    }, 700);
  }

  cerrarMenu() {

    $( '#menu .item:nth-child(1) .texto' ).css( 'opacity', '' );

    setTimeout(() => {
      $( '#menu .item:nth-child(2) .texto' ).css( 'opacity', '' );
    }, 150);

    setTimeout(() => {
      $( '#menu .item:nth-child(3) .texto' ).css( 'opacity', '' );
    }, 300);

    setTimeout(() => {
      $( '#menu' ).attr( 'data-estado', 'cerrado' );
    }, 550);
    
    setTimeout(() => {
      $( '#menu' ).css( 'background-color', '' );
      $( '.boton' ).removeClass( 'abierto' );
    }, 800);

    setTimeout(() => {
      $( '#menu' ).css( 'display', '' );
    }, 1050);
  }
}
