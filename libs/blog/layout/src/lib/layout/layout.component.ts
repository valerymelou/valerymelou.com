import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'blog-layout',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, HeroComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
