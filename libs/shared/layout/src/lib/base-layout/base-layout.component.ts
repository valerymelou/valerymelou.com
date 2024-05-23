import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { SocialBarComponent } from '../social-bar/social-bar.component';
import { slideInAnimation } from '../animations';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent, SocialBarComponent],
  templateUrl: './base-layout.component.html',
  animations: [slideInAnimation],
})
export class BaseLayoutComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  prepareRoute(): boolean {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
