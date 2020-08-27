import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Páginas
  { path: 'home'             , loadChildren: './pages/home/home.module#HomePageModule'                                       },
  { path: 'warning'          , loadChildren: './pages/warning/warning.module#WarningPageModule'                              },
  { path: 'favoritos'        , loadChildren: './pages/favoritos/favoritos.module#FavoritosPageModule'                        },
  { path: 'cerrar-aplicacion', loadChildren: './pages/cerrar-aplicacion/cerrar-aplicacion.module#CerrarAplicacionPageModule' },
  
  // Rutas con parámetros
  { path: 'informacion/:id/:categoria', loadChildren: './pages/informacion/informacion.module#InformacionPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
