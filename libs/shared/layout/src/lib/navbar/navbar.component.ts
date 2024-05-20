import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapGithub,
  bootstrapLinkedin,
  bootstrapTwitterX,
} from '@ng-icons/bootstrap-icons';
import {
  matCloseRound,
  matDarkModeRound,
  matDesktopMacRound,
  matLightModeRound,
  matMenuRound,
} from '@ng-icons/material-icons/round';
import { RouterModule } from '@angular/router';
import { MenuComponent, MenuTriggerForDirective } from '@valerymelou/shared/ui';
import { ThemeService } from '@valerymelou/core/theming';

interface NavbarLink {
  label: string;
  path: string;
}

interface SocialLink {
  icon: string;
  path: string;
  text: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    MenuComponent,
    MenuTriggerForDirective,
  ],
  viewProviders: [
    provideIcons({
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
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  links: NavbarLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
  ];
  socialLinks: SocialLink[] = [
    {
      icon: 'bootstrapGithub',
      path: 'https://github.com/valerymelou',
      text: 'GitHub',
    },
    {
      icon: 'bootstrapTwitterX',
      path: 'https://x.com/valerymelou',
      text: 'Twitter (X)',
    },
    {
      icon: 'bootstrapLinkedin',
      path: 'https://linkedin.com/in/valerymelou',
      text: 'Linkedin',
    },
  ];
  showNavigation = false;
  theme = 'dark';

  constructor(private themeService: ThemeService) {
    themeService.getTheme().subscribe({
      next: (theme: string) => {
        this.theme = theme;
      },
    });
  }

  toggleNavigation(): void {
    this.showNavigation = !this.showNavigation;
  }

  changeTheme(theme: 'dark' | 'light'): void {
    this.themeService.changeTheme(theme);
  }

  resetTheme(): void {
    this.themeService.resetPreferredTheme();
  }
}
