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
      title: 'Tech thoughts | Valery Melou',
      description:
        'Diving into the world of Django, Angular, and programming in general. Expect a mix of technical deep dives, project showcases, and industry insights.',
    });
  }
}
