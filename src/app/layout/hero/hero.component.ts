import { Component, Input } from '@angular/core';
import { SOCIAL_LINKS } from '../../core/links';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() title: string;
  @Input() strap: string;
  @Input() full = false;
  socialLinks = SOCIAL_LINKS;

  constructor() { }
}
