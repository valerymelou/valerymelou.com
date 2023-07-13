import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherGithub,
  featherInstagram,
  featherLinkedin,
  featherTwitter,
} from '@ng-icons/feather-icons';
import { Link } from '@vmelou/common/interfaces';
import { ButtonComponent } from '@vmelou/shared/ui';

@Component({
  selector: 'blog-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ButtonComponent],
  viewProviders: [
    provideIcons({
      featherGithub,
      featherInstagram,
      featherLinkedin,
      featherTwitter,
    }),
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  socialLinks: Link[] = [
    {
      url: 'https://github.com/valerymelou',
      icon: 'featherGithub',
    },
    {
      url: 'https://linkedin.com/in/valerymelou',
      icon: 'featherLinkedin',
    },
    {
      url: 'https://twitter.com/valerymelou',
      icon: 'featherTwitter',
    },
    {
      url: 'https://instagram.com/valerymelou',
      icon: 'featherInstagram',
    },
  ];
  showNav = false;
}
