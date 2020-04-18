import { Component } from '@angular/core';
import { Link, NAVBAR_LINKS, SOCIAL_LINKS } from 'src/app/core/links';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Navigation links
  navbarLinks: Link[] = NAVBAR_LINKS;

  // Social links
  socialLinks: Link[] = SOCIAL_LINKS;

  // Used to toggle the navbar on small devices
  collapsed = true;

  constructor() { }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
