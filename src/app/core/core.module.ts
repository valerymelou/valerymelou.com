import { NgModule } from '@angular/core';
import { SeoService } from './seo.service';
import { CodeHighlightService } from './code-highlight.service';

@NgModule({
  providers: [ SeoService, CodeHighlightService ]
})
export class CoreModule {}
