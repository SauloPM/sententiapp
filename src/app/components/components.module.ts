import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { MenuComponent        } from './menu/menu.component';
import { FooterComponent      } from './footer/footer.component';
import { SentenciasComponent  } from './sentencias/sentencias.component';
import { OtrasFechasComponent } from './otras-fechas/otras-fechas.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Compartir en RRSS
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    SentenciasComponent,
    OtrasFechasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    SentenciasComponent,
    OtrasFechasComponent
  ],
  providers: [
    SocialSharing
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
