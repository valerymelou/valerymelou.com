import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { filter } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
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

import { MenuComponent, MenuTriggerForDirective } from '@valerymelou/shared/ui';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-social-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    MenuTriggerForDirective,
    MenuComponent,
    SocialLinksComponent,
  ],
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
