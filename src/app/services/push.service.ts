import { Injectable } from '@angular/core';
import { OneSignal  } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor( private oneSignal: OneSignal ) {}

  configuracionInicial() {
    this.oneSignal.startInit('f7574e35-64d0-4866-8aff-30a13c65a78f', '271709238052');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    // Notificación PUSH recibida
    this.oneSignal.handleNotificationReceived().subscribe( ( notificacion ) => {
      // do something when notification is received
      console.log('Notificación recibida', notificacion);
    });

    // Notificación PUSH abierta
    this.oneSignal.handleNotificationOpened().subscribe( (notificacion ) => {
      // do something when a notification is opened
      console.log('Notificación abierta', notificacion)
    });

    this.oneSignal.endInit();
  }
}
