import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import * as PROJECTS from 'src/data//projects.json';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  title = 'Portfolio';
  strap = 'I\'ve worked with several larger as well as smaller brands. Here is a short list of the latest projects that I have built or been part of.';
  projects: Project[] = PROJECTS.data;
}
