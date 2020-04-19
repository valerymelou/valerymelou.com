import { Component, OnInit } from '@angular/core';
import { Link, SOCIAL_LINKS } from 'src/app/core/links';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'About';
  strap = 'I taught myself how to code. Now I\'m using my skills to build solutions for particulars, businesses and non-profits.';
  socialLinks: Link[] = SOCIAL_LINKS;

  constructor() { }

  ngOnInit(): void {
  }

}
