import { Component, Input, booleanAttribute } from '@angular/core';
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
import { MenuComponent, MenuTriggerForDirective } from '@valerymelou/shared/ui';
import { ThemeService } from '@valerymelou/shared/theming';

interface SocialLink {
  icon: string;
  path: string;
  text: string;
}

@Component({
  selector: 'app-social-links',
  imports: [
    CommonModule,
    NgIconComponent,
    MenuTriggerForDirective,
    MenuComponent,
  ],
  templateUrl: './social-links.component.html',
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
})
export class SocialLinksComponent {
  @Input({ transform: booleanAttribute }) vertical = false;
  theme = 'dark';
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

  constructor(private themeService: ThemeService) {
    themeService.getTheme().subscribe({
      next: (theme: string) => {
        this.theme = theme;
      },
    });
  }

  changeTheme(theme: 'dark' | 'light'): void {
    this.themeService.changeTheme(theme, false);
  }

  resetTheme(): void {
    this.themeService.resetPreferredTheme();
  }
}
