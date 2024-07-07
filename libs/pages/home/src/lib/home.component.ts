import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@valerymelou/shared/ui';
import { MetadataService } from '@valerymelou/shared/seo';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './home.component.html',
  styles: ':host {display: flex; flex-direction: column; flex: 1;}',
})
export class HomeComponent implements OnInit {
  constructor(private metadataService: MetadataService) {}

  ngOnInit(): void {
    this.metadataService.updateMetadata({
      title: 'Home of Valery Melou',
      description:
        'I build beautiful, interactive and accessible experiences for web and mobile.',
    });
  }
}
