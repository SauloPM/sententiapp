import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },

  // Envío de parámetros
  { path: 'informacion/:id', loadChildren: './informacion/informacion.module#InformacionPageModule' },
  { path: 'sentencias/:id', loadChildren: './sentencias/sentencias.module#SentenciasPageModule'    },
  { path: 'resultados/:secuencia', loadChildren: './resultados/resultados.module#ResultadosPageModule'    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
