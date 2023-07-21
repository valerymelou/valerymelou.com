import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  FooterComponent,
  HeaderComponent,
  HeroComponent,
} from '@vmelou/blog/layout';
import { Observable, finalize } from 'rxjs';
import {
  Article,
  ArticleService,
  Results,
  Tag,
  TagService,
} from '@vmelou/blog/data-access';
import { ReadTimePipe } from '@vmelou/blog/common';
import { RouterModule } from '@angular/router';
import { TagComponent } from '@vmelou/shared/ui';

@Component({
  selector: 'vmelou-blog-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    ReadTimePipe,
    TagComponent,
  ],
  templateUrl: './blog-home.component.html',
})
export class BlogHomeComponent implements OnInit {
  articles$!: Observable<Results<Article>>;
  tags$!: Observable<Results<Tag>>;
  loadingArticles = false;
  loadingTags = false;

  constructor(
    private articleService: ArticleService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.getArticles();
    this.getTags();
  }

  private getArticles(): void {
    this.loadingArticles = true;
    this.articles$ = this.articleService
      .get({})
      .pipe(finalize(() => (this.loadingArticles = false)));
  }

  private getTags(): void {
    this.loadingTags = false;
    this.tags$ = this.tagService
      .getAll()
      .pipe(finalize(() => (this.loadingTags = false)));
  }
}
