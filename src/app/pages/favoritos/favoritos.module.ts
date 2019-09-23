import { NgModule             } from '@angular/core';
import { FormsModule          } from '@angular/forms';
import { CommonModule         } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FavoritosPage } from './favoritos.page';

import { IonicModule } from '@ionic/angular';

// Componentes
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: FavoritosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavoritosPage]
})
export class FavoritosPageModule {}
