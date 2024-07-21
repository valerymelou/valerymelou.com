import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';

import {
  CfRichTextChildrenDirective,
  CfRichTextMarkDirective,
  CfRichTextNodeDirective,
  CfRichTextDocumentComponent,
} from '@flowup/contentful-rich-text-angular-renderer';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeft } from '@ng-icons/bootstrap-icons';

import { Article } from '@valerymelou/blog/data-access';
import { MetadataService } from '@valerymelou/shared/seo';
import { ButtonComponent, LinkComponent } from '@valerymelou/shared/ui';

@Component({
  selector: 'blog-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CfRichTextDocumentComponent,
    CfRichTextNodeDirective,
    CfRichTextMarkDirective,
    CfRichTextChildrenDirective,
    NgIconComponent,
    ButtonComponent,
    LinkComponent,
  ],
  templateUrl: './blog-article.component.html',
  viewProviders: [provideIcons({ bootstrapArrowLeft })],
  host: { ngSkipHydration: 'true' },
})
export class BlogArticleComponent implements OnInit, OnDestroy {
  article!: Article;
  loaded = false;
  ready = false;

  readonly BLOCKS = BLOCKS;
  readonly MARKS = MARKS;
  readonly INLINES = INLINES;

  private codeHighlightCssLink!: HTMLLinkElement;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private metadataService: MetadataService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.route.data.subscribe({
      next: (data) => {
        this.article = data['article'];
        this.metadataService.updateMetadata({
          title: this.article.title,
          description: this.article.abstract,
          image: this.article.cover?.url ?? '',
        });
        this.loaded = true;
      },
    });
  }

  ngOnInit(): void {
    this.loadCodeHighlightLib();
  }

  highlightCode(code: string): string {
    let language = code.split('\n')[0].replace('```', '');

    if (languages[language]) {
      code = code.replace('```' + language + '\n', '');
    } else {
      language = 'javascript';
    }

    return highlight(code, languages[language], language);
  }

  private loadCodeHighlightLib(): void {
    this.codeHighlightCssLink = this.renderer.createElement('link');
    this.codeHighlightCssLink.rel = 'stylesheet';
    this.codeHighlightCssLink.href =
      'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-okaidia.min.css';
    this.codeHighlightCssLink.integrity =
      'sha512-5HvW0a7ihK3ro2KhwEksDHXgIezsTeZybZDIn8d8Y015Ny+t7QWSIjnlCTjFzlK7Klb604HLGjsNqU/i5mJLjQ==';
    this.codeHighlightCssLink.crossOrigin = 'anonymous';
    this.codeHighlightCssLink.referrerPolicy = 'no-referrer';
    this.renderer.appendChild(this.document.head, this.codeHighlightCssLink);
  }

  ngOnDestroy(): void {
    if (this.codeHighlightCssLink) {
      this.renderer.removeChild(this.document.head, this.codeHighlightCssLink);
    }
  }
}
