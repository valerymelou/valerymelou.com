import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'About';
  strap = 'I taught myself how to code. Now I\'m using my skills to build solutions for particulars, businesses and non-profits.';

  constructor() { }

  ngOnInit(): void {
  }

}
