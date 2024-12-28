import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { filter } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matCloseRound,
  matDarkModeRound,
  matDesktopMacRound,
  matLightModeRound,
  matMenuRound,
} from '@ng-icons/material-icons/round';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { LogoComponent } from '../logo/logo.component';

interface NavbarLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    LogoComponent,
    SocialLinksComponent,
  ],
  viewProviders: [
    provideIcons({
      matCloseRound,
      matDarkModeRound,
      matDesktopMacRound,
      matLightModeRound,
      matMenuRound,
    }),
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  links: NavbarLink[] = [
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
  ];
  showNavigation = false;
  isAbout = false;
  isProject = false;
  isBlog = false;

  constructor(router: Router) {
    router.events
      .pipe(filter((event: unknown) => event instanceof NavigationEnd))
      .subscribe((event: unknown) => {
        if (event instanceof NavigationEnd) {
          this.isAbout = event.urlAfterRedirects === '/about';
          this.isProject = event.urlAfterRedirects === '/projects';
          this.isBlog = event.urlAfterRedirects.startsWith('/blog');
        }
      });
  }

  toggleNavigation(): void {
    this.showNavigation = !this.showNavigation;
  }
}
