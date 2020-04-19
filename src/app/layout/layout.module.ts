import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [NavbarComponent, HeroComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    HeroComponent,
    FooterComponent
  ],
})
export class LayoutModule { }
