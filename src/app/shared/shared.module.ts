import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLinksComponent } from './social-links/social-links.component';



@NgModule({
  declarations: [SocialLinksComponent],
  imports: [
    CommonModule
  ],
  exports: [SocialLinksComponent]
})
export class SharedModule { }
