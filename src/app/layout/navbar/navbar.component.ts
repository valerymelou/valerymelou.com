import { Component } from '@angular/core';

import { Link } from 'src/app/core/link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Navigation links
  navbarLinks: Link[] = [
    {
      route: '/',
      label: 'Home',
      icon: 'icon-landmark',
      exactMatch: true
    },
    {
      route: '/about',
      label: 'About',
      icon: 'icon-person',
      exactMatch: true,
    },
    {
      route: '/',
      label: 'Portfolio',
      icon: 'icon-project',
      exactMatch: true
    },
    {
      route: '/',
      label: 'Blog',
      icon: 'icon-paper',
      exactMatch: true
    },
    {
      route: '/',
      label: 'Contact',
      icon: 'icon-email',
      exactMatch: true
    }
  ];

  // Used to toggle the navbar on small devices
  collapsed = true;

  constructor() { }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
