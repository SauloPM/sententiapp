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

  otrasFechas: Fecha    [];
  sentencias : Sentencia[];

  id       : number = 0;
  categoria: string = 'Todos';

  fecha: Fecha = {
    id: 0,
    etiqueta: '',
    descripcion: 'Esta sentencia no contiene ninguna descripción.',
    imagen: ''
  };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicioFechas: FechasService, private activatedRoute: ActivatedRoute, private navController: NavController ) { }

  ngOnInit() {

    this.getDatos(); // Guardamos en una variable los datos de la fecha actual y en otra las sentencias    

  }

  // Volver a la página anterior
  volverAtras() {
    this.navController.back();
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  getDatos() {
    this.activatedRoute.params.subscribe( parametrosURL => {

      // Almacenamos los parámetros de la URL
      this.id        = parametrosURL.id;
      this.categoria = parametrosURL.categoria;

      // Obtenemos el título y la descripción de la fecha actual
      this.servicioFechas.getDatosFecha( parametrosURL.id ).subscribe( data => {
        this.fecha = data[0];
      });

      // Obtenemos las sentencias de la fecha actual
      this.servicioFechas.getSentencias( parametrosURL.id ).subscribe( ( data: Sentencia[] ) => {
        this.sentencias = this.categoria === 'Todos' ? data : data.filter ( item => item.categoria === this.categoria );
      });

      // Obtenemos todas las fechas menos la actual
      this.servicioFechas.getFechas().subscribe( data => {
        this.otrasFechas = data.filter( item => item.id != this.id ); // Si cambias != por !== no funcionará porque this.id o parametrosURL.id son de tipo string, aunque this.id fuera declarado como int
      });
    });
  }
}
