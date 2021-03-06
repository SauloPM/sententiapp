import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Servicios
import { HttpClientModule } from '@angular/common/http';

// Módulos
import { ComponentsModule } from './components/components.module';

// Almacenamiento local
import { IonicStorageModule } from '@ionic/storage';

// Firebase
import { firebaseConfiguration     } from "../environments/firebase-configuration";
import { AngularFireModule         } from "@angular/fire";
import { AngularFireAuthModule     } from "@angular/fire/auth";
import { AngularFirestoreModule    } from "@angular/fire/firestore";
import { AngularFireStorageModule  } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),

    // Firebase
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp( firebaseConfiguration )
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
