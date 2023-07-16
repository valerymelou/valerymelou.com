import { Injectable } from '@angular/core';
import { ContentfulService } from '@vmelou/cms/contentful';
import { Article } from './article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends ContentfulService<Article> {
  constructor() {
    super(Article, 'article');
  }
}
