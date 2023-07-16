import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article, ArticleService } from '@vmelou/blog/data-access';
import { Collection } from '@vmelou/cms/core';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'blog-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService
      .getEntries()
      .subscribe((articles: Collection<Article>) => {
        console.log('articles => ', articles);
      });
  }
}
