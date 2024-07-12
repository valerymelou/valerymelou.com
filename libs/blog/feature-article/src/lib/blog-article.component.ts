import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { map, Observable } from 'rxjs';

import { Article, ArticleService } from '@valerymelou/blog/data-access';
import { MetadataService } from '@valerymelou/shared/seo';

@Component({
  selector: 'blog-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-article.component.html',
})
export class BlogArticleComponent {
  article$!: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private metadataService: MetadataService,
  ) {
    this.route.params.subscribe({
      next: (params: Params) => {
        if (params['slug']) this.getArticle(params['slug']);
      },
    });
  }

  getArticle(slug: string): void {
    slug = slug.split('-').slice(3).join('-');
    this.article$ = this.articleService.getOne(slug).pipe(
      map((article: Article) => {
        this.metadataService.updateMetadata({
          title: article.title,
          description: article.abstract,
          image: article.cover?.url,
        });
        return article;
      }),
    );
  }
}
