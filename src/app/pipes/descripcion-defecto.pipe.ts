import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descripcionDefecto'
})
export class DescripcionDefectoPipe implements PipeTransform {

  transform( texto: string ): string {
    return texto.startsWith('Lorem ipsum') ? 'Esta fecha no contiene asociada ninguna descripción.' : texto;
  }

}
