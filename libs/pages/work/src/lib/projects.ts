import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixLink } from '@ng-icons/remixicon';

import { MetadataService } from '@vm/shared/seo';

import { Project } from './project';

@Component({
  selector: 'pages-projects',
  imports: [NgOptimizedImage, NgIconComponent],
  templateUrl: './projects.html',
  styles: `
    :host {
      view-transition-name: count;
      display: block;
    }
  `,
  viewProviders: [provideIcons({ remixLink })],
})
export class Projects {
  projects: Project[] = [
    {
      title: 'Ledgerly',
      description:
        "I built a minimalist and intuitive application to help you plan, track and get insights on your expenses. Built with sqlite as a database to keep the data on the user's phone.",
      link: 'https://ledgerly.download/',
      tools: ['Flutter', 'SQLite'],
      image: '/screenshots/ledgerly.png',
    },
    {
      title: 'Lysties',
      description:
        'I developed and launched a comprehensive business review website connecting users with local businesses.',
      link: 'https://lysties.com/',
      tools: ['Django', 'Angular', 'PostgreSQL', 'Docker', 'GCP'],
      image: '/screenshots/lysties.png',
    },
    {
      title: 'Mapping of organizations working on the SDGs',
      description:
        'I built the frontend of the of this platform listing the organizations working on Sustainable Development Goals as identified by the Francophonie.',
      link: 'https://cartodd.francophonie.org/',
      tools: ['Angular', 'Open Layers', 'Tailwind CSS'],
      image: '/screenshots/ifdd.png',
    },
  ];

  private readonly metadataService = inject(MetadataService);

  constructor() {
    this.metadataService.updateMetadata({
      title: 'Work | Valery Melou',
      description: 'Here are some of the projects I have worked on.',
    });
  }
}
