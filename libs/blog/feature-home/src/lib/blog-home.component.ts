import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Article, Results } from '@valerymelou/blog/data-access';
import { LinkComponent } from '@valerymelou/shared/ui';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MetadataService } from '@valerymelou/shared/seo';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LinkComponent],
  templateUrl: './blog-home.component.html',
})
export class BlogHomeComponent {
  articles!: Results<Article>;

  constructor(route: ActivatedRoute, metadataService: MetadataService) {
    route.data.subscribe({
      next: (data) => {
        this.articles = data['articles'];
      },
    });
    metadataService.updateMetadata({
      title: 'Inside my head | Valery Melou',
      description:
        'I talk about Django, Angular... Web Development in general and many other topics. These are just a few of the things in my head.',
    });
  }
}
