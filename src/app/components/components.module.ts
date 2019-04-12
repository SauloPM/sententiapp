import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { OtrasFechasComponent } from './otras-fechas/otras-fechas.component';

@NgModule({
  declarations: [
    OtrasFechasComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
      OtrasFechasComponent
  ]
})
export class ComponentsModule { }
