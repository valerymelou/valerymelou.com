import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFooter = true;
  updatesAvailable = false;

  constructor(private updates: SwUpdate, public router: Router) {
    this.updates.available.subscribe(() => {
      this.updatesAvailable = true;
    });
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.showFooter = event.url !== '/';
      }
    });
  }

  refreshApp() {
    this.updates.activateUpdate().then(() => window.location.reload());
  }
}
