import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { SocialComponent } from './social/social.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    BlogLayoutComponent,
    BaseLayoutComponent,
    NavbarComponent,
    SocialComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    SocialComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class LayoutModule { }
