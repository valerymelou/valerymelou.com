import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import {
  CfRichTextChildrenDirective,
  CfRichTextMarkDirective,
  CfRichTextNodeDirective,
  CfRichTextDocumentComponent,
} from '@flowup/contentful-rich-text-angular-renderer';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeft } from '@ng-icons/bootstrap-icons';

import { Article } from '@valerymelou/blog/data-access';
import { MetadataService } from '@valerymelou/shared/seo';
import {
  ButtonComponent,
  CodeComponent,
  LinkComponent,
} from '@valerymelou/shared/ui';

@Component({
  selector: 'blog-article',
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
    CodeComponent,
  ],
  templateUrl: './blog-article.component.html',
  viewProviders: [provideIcons({ bootstrapArrowLeft })],
})
export class BlogArticleComponent {
  article!: Article;
  loaded = false;
  ready = false;

  readonly BLOCKS = BLOCKS;
  readonly MARKS = MARKS;
  readonly INLINES = INLINES;

  constructor(
    private route: ActivatedRoute,
    private metadataService: MetadataService,
  ) {
    this.route.data.subscribe({
      next: (data) => {
        this.article = data['article'];
        this.metadataService.updateMetadata({
          title: this.article.title,
          description: this.article.abstract,
          image: this.article.cover?.url ?? '',
        });
        this.loaded = true;
      },
    });
  }
}
