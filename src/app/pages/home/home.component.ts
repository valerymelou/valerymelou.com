import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'Hi, I\'m Valery!';
  strap = 'I am a full-stack web developer from Yaounde, Cameroon. I enjoy using web technologies to build everything from small websites to highly interactive apps for web, mobile and desktop.';

  constructor() { }

  ngOnInit(): void {
  }

}
