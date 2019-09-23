import { NgModule             } from '@angular/core';
import { FormsModule          } from '@angular/forms';
import { IonicModule          } from '@ionic/angular';
import { CommonModule         } from '@angular/common';
import { InformacionPage      } from './informacion.page';
import { Routes, RouterModule } from '@angular/router';

// Pipes
import { PipesModule } from 'src/app/pipes/pipes.module';

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
    PipesModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InformacionPage
  ]
})
export class InformacionPageModule {}
