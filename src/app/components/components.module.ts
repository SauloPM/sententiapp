import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { SentenciasComponent  } from './sentencias/sentencias.component';
import { OtrasFechasComponent } from './otras-fechas/otras-fechas.component';

// Compartir en RRSS
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [
    SentenciasComponent,
    OtrasFechasComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
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
