import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fecha          } from '../interfaces/fechas';
import { FechasService  } from '../services/fechas.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage {

  // Atributos
  id: number;
  fecha: any;

  // Constructor
  constructor(private activatedRoute: ActivatedRoute, private servicioFechas: FechasService) {

    this.servicioFechas.getFecha(5).subscribe( (data: any) => {
      this.fecha = data[0];
    });

    // this.servicioFechas.getFecha(5).subscribe( (data: any[]) => {
    //   this.fecha = data;
    // });

    // this.activatedRoute.params.subscribe( parametroURL => {
    //   this.id = parametroURL.id;

    //   this.servicioFechas.getFecha(this.id).subscribe( (data: any[]) => {
    //     this.fecha = data;
    //   });
    // });
  }
}
