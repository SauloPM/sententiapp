import { PushService } from './services/push.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService: PushService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      // Esto se hace porque el topbar se pone en negro
      // this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.styleBlackOpaque();
      }

      this.splashScreen.hide();

      this.pushService.configuracionInicial();
    });
  }
}
