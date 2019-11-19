import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

import { StatusBar    } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  
  backButtonSubscription;

  constructor(
    public router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private pushService: PushService,
    private splashScreen: SplashScreen
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
