import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { SocialLinksComponent } from './social-links/social-links.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { TruncateWordsPipe } from './pipes/truncate-words.pipe';
import { SlugifyPipe } from './pipes/slugify.pipe';


@NgModule({
  declarations: [
    SocialLinksComponent,
    ContactCardComponent,
    TruncateWordsPipe,
    SlugifyPipe
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule.forRoot({ preset: scrollPreset }),
  ],
  exports: [
    SocialLinksComponent,
    LazyLoadImageModule,
    ContactCardComponent,
    TruncateWordsPipe,
    SlugifyPipe
  ],
  providers: [ SlugifyPipe ]
})
export class SharedModule { }
