import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { ImagenDefectoPipe      } from './imagen-defecto.pipe';
import { DescripcionDefectoPipe } from './descripcion-defecto.pipe';

@NgModule({
  declarations: [
    ImagenDefectoPipe,
    DescripcionDefectoPipe
  ],
  exports: [
    ImagenDefectoPipe,
    DescripcionDefectoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
