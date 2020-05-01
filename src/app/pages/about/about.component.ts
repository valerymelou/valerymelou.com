import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/core/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  title = 'About';
  strap = 'I taught myself how to code. Now I\'m using my skills to build solutions for particulars, businesses and non-profits.';

  constructor(seoService: SeoService) {
    seoService.setSocialMediaTags(
      '/about',
      'About',
      'I am a web developer from Yaounde, Cameroon. I love working with Python, JavaScript, PHP, Django, Angular, Symfony.'
    );
  }

  ngOnInit(): void {
  }

}
