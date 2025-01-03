import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataService } from '@valerymelou/shared/seo';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  constructor(metadataService: MetadataService) {
    metadataService.updateMetadata({
      title: 'Some of the things I have built | Valery Melou',
      description: 'Here are some of the projects I have worked on.',
    });
  }
}
