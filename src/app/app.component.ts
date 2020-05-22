import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { slideInAnimation } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  showFooter = true;
  updatesAvailable = false;

  constructor(private updates: SwUpdate, public router: Router) {
    this.updates.available.subscribe(() => {
      this.updatesAvailable = true;
    });
  }

  refreshApp() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
