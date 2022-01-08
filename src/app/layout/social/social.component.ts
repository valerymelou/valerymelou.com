import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/core/link';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html'
})
export class SocialComponent implements OnInit {
  loaded = false;
  links: Link[] = [
    {
      title: 'Github',
      icon: 'feather-github',
      path: 'https://github.com/valerymelou'
    },
    {
      title: 'LinkedIn',
      icon: 'feather-linkedin',
      path: 'https://www.linkedin.com/in/valerymelou/'
    },
    {
      title: 'Twitter',
      icon: 'feather-twitter',
      path: 'https://twitter.com/valerymelou'
    }
  ];
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }
}
