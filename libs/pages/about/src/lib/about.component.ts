import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataService } from '@valerymelou/shared/seo';
import { LinkComponent } from '@valerymelou/shared/ui';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LinkComponent],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  constructor(metadataService: MetadataService) {
    metadataService.updateMetadata({
      title: 'About myself | Valery Melou',
      description:
        "I'm now specialized into web development. Building RESTfull APIs with Django and Python then, consuming those APIs with Angular and Typescript.",
    });
  }
}
