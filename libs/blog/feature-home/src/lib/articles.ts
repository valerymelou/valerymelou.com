import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Article, Results } from '@vm/blog/data-access';
import { MetadataService } from '@vm/shared/seo';

@Component({
  selector: 'blog-articles',
  imports: [DatePipe, RouterLink, NgOptimizedImage],
  templateUrl: './articles.html',
  styles: `
    :host {
      view-transition-name: count;
      display: block;
    }
  `,
})
export class Articles {
  articles!: Results<Article>;

  private readonly route = inject(ActivatedRoute);
  private readonly metadataService = inject(MetadataService);

  constructor() {
    this.route.data.subscribe({
      next: (data) => {
        this.articles = data['articles'];
      },
    });
    this.metadataService.updateMetadata({
      title: 'Software Development & Tech Insights | Valery Melou',
      description:
        'Practical articles and tutorials on software development. Explore topics like Django, Angular, Python, and AI from a real-world developer',
    });
  }
}
