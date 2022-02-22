import { Component, OnInit } from '@angular/core';
import { ContentfulService } from './core/contentful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService.getProjects().subscribe(projects => {
      console.log(projects);
    });
  }
}
