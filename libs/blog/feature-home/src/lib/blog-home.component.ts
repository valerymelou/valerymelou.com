import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import {
  Article,
  ArticleService,
  Results,
  Tag,
  TagService,
} from '@valerymelou/blob/data-access';
import { LinkComponent } from '@valerymelou/shared/ui';
import { RouterModule } from '@angular/router';
import { MetadataService } from '@valerymelou/shared/seo';

@Component({
  selector: 'blog-blog-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LinkComponent],
  templateUrl: './blog-home.component.html',
})
export class BlogHomeComponent implements OnInit {
  articles$!: Observable<Results<Article>>;
  tags$!: Observable<Results<Tag>>;

  ngOnInit(): void {
    this.metadataService.updateMetadata({
      title: 'Inside my head | Valery Melou',
      description:
        'I talk about Django, Angular... Web Development in general and many other topics. These are just a few of the things in my head.',
    });
    this.loadArticles();
    this.loadTags();
  }

  constructor(
    private articleService: ArticleService,
    private metadataService: MetadataService,
    private tagService: TagService,
  ) {}

  loadArticles(): void {
    this.articles$ = this.articleService.get({});
  }

  loadTags(): void {
    this.tags$ = this.tagService.getAll();
  }
}
