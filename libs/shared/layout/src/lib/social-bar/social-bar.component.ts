import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { filter } from 'rxjs';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapGithub,
  bootstrapLinkedin,
  bootstrapTwitterX,
  bootstrapArrowRight,
} from '@ng-icons/bootstrap-icons';
import {
  matCloseRound,
  matDarkModeRound,
  matDesktopMacRound,
  matLightModeRound,
  matMenuRound,
} from '@ng-icons/material-icons/round';

import { SocialLinksComponent } from '../social-links/social-links.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-social-bar',
  imports: [CommonModule, RouterModule, LogoComponent, SocialLinksComponent],
  templateUrl: './social-bar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapArrowRight,
      bootstrapGithub,
      bootstrapLinkedin,
      bootstrapTwitterX,
      matCloseRound,
      matDarkModeRound,
      matDesktopMacRound,
      matLightModeRound,
      matMenuRound,
    }),
  ],
})
export class SocialBarComponent {
  isHome = false;

  constructor(router: Router) {
    router.events
      .pipe(filter((event: unknown) => event instanceof NavigationEnd))
      .subscribe((event: unknown) => {
        if (event instanceof NavigationEnd) {
          this.isHome = event.urlAfterRedirects === '/';
        }
      });
  }
}
