import { Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapGithub,
  bootstrapLinkedin,
  bootstrapTwitterX,
} from '@ng-icons/bootstrap-icons';

interface SocialLink {
  icon: string;
  path: string;
  text: string;
}

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './social-links.component.html',
  viewProviders: [
    provideIcons({ bootstrapGithub, bootstrapLinkedin, bootstrapTwitterX }),
  ],
})
export class SocialLinksComponent {
  @Input({ transform: booleanAttribute }) vertical = false;
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
}
