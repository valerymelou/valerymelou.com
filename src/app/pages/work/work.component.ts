import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/contentful.service';
import { Project } from 'src/app/core/project';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  projects: Project[] = [];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.contentfulService.getProjects().subscribe(projects => {
      this.projects = projects.items;
    });
  }
}
