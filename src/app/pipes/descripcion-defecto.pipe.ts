import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descripcionDefecto'
})
export class DescripcionDefectoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
