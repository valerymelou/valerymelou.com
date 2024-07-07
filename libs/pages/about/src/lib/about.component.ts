import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataService } from '@valerymelou/shared/seo';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  constructor(private metadataService: MetadataService) {}

  ngOnInit(): void {
    this.metadataService.updateMetadata({
      title: 'About myself (Valery Melou)',
      description:
        "I'm now specialized into web development. Building RESTfull APIs with Django and Python then, consuming those APIs with Angular and Typescript.",
    });
  }
}
