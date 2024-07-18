import {
  AfterViewChecked,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';

import { map, Observable } from 'rxjs';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { highlight, languages, highlightAll } from 'prismjs';
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

import { Article, ArticleService } from '@valerymelou/blog/data-access';
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
})
export class BlogArticleComponent
  implements AfterViewChecked, OnInit, OnDestroy
{
  article$!: Observable<Article>;
  loaded = false;
  ready = false;

  readonly BLOCKS = BLOCKS;
  readonly MARKS = MARKS;
  readonly INLINES = INLINES;

  private codeHighlightCssLink!: HTMLLinkElement;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private metadataService: MetadataService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.route.params.subscribe({
      next: (params: Params) => {
        if (params['slug']) this.getArticle(params['slug']);
      },
    });
  }

  ngAfterViewChecked(): void {
    if (this.loaded && !this.ready) {
      highlightAll();
    }
  }

  ngOnInit(): void {
    this.loadCodeHighlightLib();
  }

  getArticle(slug: string): void {
    slug = slug.split('-').slice(3).join('-');
    this.article$ = this.articleService.getOne(slug).pipe(
      map((article: Article) => {
        this.metadataService.updateMetadata({
          title: article.title,
          description: article.abstract,
          image: article.cover?.url ?? '',
        });
        this.loaded = true;
        return article;
      }),
    );
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
