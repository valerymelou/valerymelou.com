import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';


@NgModule({
  declarations: [NavbarComponent, HeroComponent],
  exports: [
    NavbarComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
