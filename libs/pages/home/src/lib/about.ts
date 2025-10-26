import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MetadataService } from '@vm/shared/seo';

@Component({
  selector: 'pages-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styles: `
    :host {
      view-transition-name: count;
      display: block;
    }
  `,
})
export class About {
  private readonly metadataService = inject(MetadataService);
  constructor() {
    this.metadataService.updateMetadata({
      title: 'Valery Melou - Full-Stack Developer & Product Builder',
      description:
        'I am a Full-Stack Developer and CTO specializing in Python, Django, and Angular. Explore my portfolio, projects, and tech articles.',
    });
  }
}
