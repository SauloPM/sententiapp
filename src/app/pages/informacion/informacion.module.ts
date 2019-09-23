import { NgModule             } from '@angular/core';
import { FormsModule          } from '@angular/forms';
import { IonicModule          } from '@ionic/angular';
import { CommonModule         } from '@angular/common';
import { InformacionPage      } from './informacion.page';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: InformacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [
    InformacionPage
  ]
})
export class InformacionPageModule {}
