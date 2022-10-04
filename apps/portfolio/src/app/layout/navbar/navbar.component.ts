import { Component } from '@angular/core';
import { NavLink } from './nav-link';

@Component({
  selector: 'vm-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  hidden = true;  // Hide the navbar per default (only for small devices)

  links: NavLink[] = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/work',
      label: 'Work'
    },
    {
      path: '/labs',
      label: 'Labs'
    },
    {
      path: '/blog',
      label: 'Blog'
    },
    {
      path: '/contact',
      label: 'Contact'
    }
  ];

  toggle(): void {
    this.hidden = !this.hidden;
  }
}
