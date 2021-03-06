import { Pipe, PipeTransform } from '@angular/core';

const url = 'https://sententiapp.iatext.ulpgc.es/img/fechas/';

@Pipe({
  name: 'imagenDefecto'
})
export class ImagenDefectoPipe implements PipeTransform {

  transform( imagen: string ): string {
    return imagen === 'default.jpg' ? './assets/img/default.jpg' : `${ url }${ imagen }`;
  }
}
