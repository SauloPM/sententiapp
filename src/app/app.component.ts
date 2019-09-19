import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { PushService } from './services/push.service';

import { Platform     } from '@ionic/angular';
import { StatusBar    } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  
  backButtonSubscription;

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

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
