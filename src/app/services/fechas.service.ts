import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Fecha     } from '../interfaces/fecha';
import { Modal     } from '../interfaces/modal';
import { Sentencia } from '../interfaces/sentencia';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor( private http: HttpClient ) {}

  getFechas() { // Función que solicita un JSON mediante HTTP (método GET) con el ID, la etiqueta, el día y la imagen de toda las fechas 
    return this.http.get<Fecha[]>('https://appstip.iatext.ulpgc.es/ServicioSententiApp/sentencias.asmx/MostrarFechas');
  }

  getDatosFecha( id: number ) { // Función que solicita un JSON mediante HTTP (método GET) con todos los datos de la fecha cuyo ID se envía como parámetro
    return this.http.get<Fecha>(`https://appstip.iatext.ulpgc.es/ServicioSententiApp/sentencias.asmx/MostrarInformacionFecha?id=${ id }`);
  }

  getSentencias( id: number ) { // Función que solicita un JSON mediante HTTP (método GET) con todas las sentencias y sus autores de la fecha cuyo ID se envía como parámetro
    return this.http.get<Sentencia[]>(`https://appstip.iatext.ulpgc.es/ServicioSententiApp/sentencias.asmx/MostrarSentencias?id=${ id }`);
  }

  getDatosSentencia( id: number ) {
    return this.http.get<Modal>(`https://appstip.iatext.ulpgc.es/ServicioSententiApp/sentencias.asmx/MostrarInformacionSentencia?id=${ id }`);
  }
}
