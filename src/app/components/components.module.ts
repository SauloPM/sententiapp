import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
