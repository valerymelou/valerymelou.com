import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '@valerymelou/shared/ui';
import { MetadataService } from '@valerymelou/shared/seo';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './home.component.html',
  styles: ':host {display: flex; flex-direction: column; flex: 1;}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(metadataService: MetadataService) {
    metadataService.updateMetadata({
      title: 'Home of Valery Melou',
      description:
        'I build beautiful, interactive and accessible experiences for web and mobile.',
    });
  }
}
