import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Páginas
import { InformacionPage } from './informacion/informacion.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },

  // Envío de parámetros en de la URL
  { path: 'informacion/:id', loadChildren: './informacion/informacion.module#InformacionPageModule' },
  { path: 'sentencias/:id' , loadChildren: './sentencias/sentencias.module#SentenciasPageModule'    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
