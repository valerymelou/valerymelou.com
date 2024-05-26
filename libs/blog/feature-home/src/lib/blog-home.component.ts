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
    this.loadArticles();
    this.loadTags();
  }

  constructor(
    private articleService: ArticleService,
    private tagService: TagService,
  ) {}

  loadArticles(): void {
    this.articles$ = this.articleService.get({});
  }

  loadTags(): void {
    this.tags$ = this.tagService.getAll();
  }
}
