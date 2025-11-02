import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import {
  CfRichTextChildrenDirective,
  CfRichTextMarkDirective,
  CfRichTextNodeDirective,
  CfRichTextDocumentComponent,
} from '@flowup/contentful-rich-text-angular-renderer';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixShare2 } from '@ng-icons/radix-icons';
import {
  remixLinkedinFill,
  remixTwitterXFill,
  remixLink,
} from '@ng-icons/remixicon';

import { MetadataService } from '@vm/shared/seo';
import { Article as ArticleEntry } from '@vm/blog/data-access';
import { Code, Link, Menu, MenuTriggerFor, Button } from '@vm/shared/ui';
import { WINDOW_TOKEN } from '@vm/common/browser';
import { ThemeService } from '@vm/shared/theming';

import { ArticleEmbedded } from '../article-embedded/article-embedded';

@Component({
  selector: 'blog-article',
  imports: [
    DatePipe,
    NgOptimizedImage,
    NgIconComponent,
    CfRichTextDocumentComponent,
    CfRichTextNodeDirective,
    CfRichTextMarkDirective,
    CfRichTextChildrenDirective,
    ArticleEmbedded,
    Link,
    Code,
    Button,
    Menu,
    MenuTriggerFor,
    RouterLink,
  ],
  templateUrl: './article.html',
  styles: `
    :host {
      view-transition-name: count;
      display: block;
    }
  `,
  viewProviders: [
    provideIcons({
      radixShare2,
      remixLink,
      remixTwitterXFill,
      remixLinkedinFill,
    }),
  ],
})
export class Article {
  article!: ArticleEntry;
  theme = 'light';

  private route = inject(ActivatedRoute);
  private metadataService = inject(MetadataService);
  private window = inject(WINDOW_TOKEN);
  private themeService = inject(ThemeService);

  @ViewChild('giscus', { static: false })
  private giscusContainer?: ElementRef<HTMLElement>;

  readonly BLOCKS = BLOCKS;
  readonly MARKS = MARKS;
  readonly INLINES = INLINES;

  constructor() {
    this.themeService.getTheme().subscribe({
      next: (theme) => {
        this.theme = theme;
      },
    });
    this.route.data.subscribe({
      next: (data) => {
        this.article = data['article'];
        this.metadataService.updateMetadata({
          title: `${this.article.title} | Valery Melou`,
          description: this.article.abstract,
          image: this.article.cover?.url ?? '',
        });

        // Inject giscus after article loads and view renders
        setTimeout(() => this.#injectGiscus(), 0);
      },
    });
  }

  #injectGiscus() {
    const doc = this.window?.document;
    const container = this.giscusContainer?.nativeElement;
    if (!doc || !container) return;

    // Clear any existing instance to prevent duplicates on client-side navigation
    container.innerHTML = '';

    const script = doc.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'valerymelou/valerymelou.com');
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkxNDEzNDExNDQ=');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOCGyx2M4CxFXr');
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', this.theme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    container.appendChild(script);
  }

  // Sharing helpers
  copyLink(): void {
    const absUrl = this.#absoluteArticleUrl();
    this.window?.navigator?.clipboard?.writeText(absUrl);
  }

  shareOnX(): void {
    const absUrl = encodeURIComponent(this.#absoluteArticleUrl());
    const text = encodeURIComponent(this.article?.title ?? '');
    const shareUrl = `https://twitter.com/intent/tweet?url=${absUrl}&text=${text}`;
    this.#openShare(shareUrl);
  }

  shareOnLinkedIn(): void {
    const absUrl = encodeURIComponent(this.#absoluteArticleUrl());
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${absUrl}`;
    this.#openShare(shareUrl);
  }

  #absoluteArticleUrl(): string {
    const origin = this.window?.location?.origin ?? '';
    return `${origin}/blog/${this.article?.url}`;
  }

  #openShare(url: string): void {
    const w = this.window;
    if (w && typeof w.open === 'function') {
      w.open(url, '_blank', 'noopener');
    }
  }
}
