import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Asset, Entry, EntrySkeletonType } from 'contentful';

import { Article } from '@vm/blog/data-access';

@Component({
  selector: 'blog-article-embedded',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './article-embedded.html',
  styles: `
    :host {
      max-width: calc(50% - 1rem);
      display: inline-flex;
      @media (max-width: 480px) {
        max-width: 100%;
        display: flex;
      }
    }
  `,
})
export class ArticleEmbedded {
  entry = input.required<Entry<EntrySkeletonType, undefined, string>>();

  // Signal to hold the initialized article data
  article = signal<Article | null>(null);

  constructor() {
    // Effect to initialize article whenever entry input changes
    effect(() => {
      const entryValue = this.entry();
      if (entryValue) {
        this.initializeArticle(entryValue);
      }
    });
  }

  /**
   * Initialize the article from the contentful entry
   */
  private initializeArticle(
    entry: Entry<EntrySkeletonType, undefined, string>,
  ): void {
    try {
      const assets: Asset[] = [];
      if (entry.fields['cover']) {
        assets.push(entry.fields['cover'] as Asset);
      }
      // Convert the Contentful entry to an Article instance
      const articleData = Article.fromEntry(entry, assets);
      this.article.set(articleData);
    } catch {
      this.article.set(null);
    }
  }
}
