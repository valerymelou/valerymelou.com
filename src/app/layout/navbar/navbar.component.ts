import { Component } from '@angular/core';
import { NavbarLink } from './navbar-link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  links: NavbarLink[] = [
    {
      title: 'Home',
      icon: 'hero-home',
      path: '/',
      isExtra: false
    },
    {
      title: 'About',
      icon: 'hero-user',
      path: '/about',
      isExtra: false
    },
    {
      title: 'Work',
      icon: 'hero-briefcase',
      path: '/work',
      isExtra: false
    },
    {
      title: 'Contact',
      icon: 'hero-at-symbol',
      path: '/contact',
      isExtra: false
    },
    {
      title: 'Blog',
      icon: 'hero-newspaper',
      path: '/blog',
      isExtra: true
    }
  ];
  collapsed = true;

  constructor() { }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
