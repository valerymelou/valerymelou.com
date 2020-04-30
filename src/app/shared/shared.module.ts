import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { SocialLinksComponent } from './social-links/social-links.component';
import { ContactCardComponent } from './contact-card/contact-card.component';


@NgModule({
  declarations: [SocialLinksComponent, ContactCardComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule.forRoot({ preset: scrollPreset }),
  ],
  exports: [SocialLinksComponent, LazyLoadImageModule, ContactCardComponent]
})
export class SharedModule { }
