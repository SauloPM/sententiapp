import { Pipe, PipeTransform } from '@angular/core';

const url = 'http://sententiapp.iatext.ulpgc.es/img/fechas/';

@Pipe({
  name: 'imagenDefecto'
})
export class ImagenDefectoPipe implements PipeTransform {

  transform( imagen: string ): string {
    return imagen == '/img/fechas/default.jpg' ? './assets/img/default-image.jpg' : `${ url }${ imagen }`;
  }
}