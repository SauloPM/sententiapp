import { Component } from '@angular/core';

import { Router       } from '@angular/router';
import { Platform     } from '@ionic/angular';
import { StatusBar    } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  constructor( public router: Router, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {

      // Evitamos que el topbar aparezca en negro
      if (this.platform.is('android')) {
        this.statusBar.styleBlackOpaque();
      }

      this.splashScreen.hide();
    });
  }
}