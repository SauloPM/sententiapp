import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CerrarAplicacionPage } from './cerrar-aplicacion.page';

const routes: Routes = [
  {
    path: '',
    component: CerrarAplicacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CerrarAplicacionPage]
})
export class CerrarAplicacionPageModule {}
