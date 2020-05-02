import { Component, Input } from '@angular/core';

import { Link } from '../../core/link';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
  @Input() scheme = 'light';
  links: Link[] = [
    {
      route: 'https://github.com/valerymelou',
      label: 'See my work on GitHub',
      icon: 'icon-github'
    },
    {
      route: 'https://twitter.com/valerymelou',
      label: 'Follow me on Twitter',
      icon: 'icon-twitter'
    },
    {
      route: 'https://linkedin.com/in/valerymelou',
      label: 'Let\'s connect on Linkedin',
      icon: 'icon-linkedin'
    }
  ];

  constructor() { }
}
