import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { SocialLinksComponent } from './social-links/social-links.component';


@NgModule({
  declarations: [SocialLinksComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule.forRoot({ preset: scrollPreset }),
  ],
  exports: [SocialLinksComponent, LazyLoadImageModule]
})
export class SharedModule { }
