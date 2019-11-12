import { Component, OnInit } from '@angular/core';
import { NavController     } from '@ionic/angular';
import { ActivatedRoute    } from '@angular/router';

// Interfaces
import { Fecha     } from '../../interfaces/fecha';
import { Sentencia } from '../../interfaces/sentencia';

// Servicios
import { FechasService } from '../../services/fechas.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html'
})
export class InformacionPage implements OnInit {

  fecha: Fecha = {
    id: 0,
    etiqueta: '',
    descripcion: 'Esta sentencia no contiene ninguna descripción.',
    imagen: ''
  };
  
  idFechaURL  : number = 0;
  categoriaURL: string = 'Todos';

  otrasFechas: Fecha    [] = [];
  sentencias : Sentencia[] = [];

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicioFechas: FechasService, private activatedRoute: ActivatedRoute, private navController: NavController ) { }

  ngOnInit() {

    // Guardamos en una variable todas las fechas
    this.servicioFechas.getFechas().subscribe( ( data: Fecha[]) => {
      this.otrasFechas = data;
    });

    // Obtenemos los parámetros de la URL (en este caso solo es el id de la fecha)
    this.activatedRoute.params.subscribe( parametroURL => {

      this.idFechaURL   = parametroURL.id;
      this.categoriaURL = parametroURL.categoria;

      // Guardamos en una variable los datos de la fecha cuyo ID se encuentra en la URL
      this.servicioFechas.getDatosFecha( parametroURL.id ).subscribe( ( data ) => {
        this.fecha = data[0];
      });

      // Guardamos en una variable las sentencias de la fecha cuyo ID se encuentra en la URL
      this.servicioFechas.getSentencias( parametroURL.id ).subscribe( ( data: Sentencia[] ) => {
        this.sentencias = this.categoriaURL === 'Todos' ? data : data.filter ( item => item.categoria === this.categoriaURL );
      });

    });

  }

  // Volver a la página anterior
  volverAtras() {
    this.navController.back();
  }

  // Volver a la página de inicio
  // volverInicio() {
  //   this.navController.navigateBack('/');
  // }

}
