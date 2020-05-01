import { Component } from '@angular/core';
import { SeoService } from 'src/app/core/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public title = 'Hi, I\'m Valery!';
  strap = 'I am a web developer from Yaounde, Cameroon. I enjoy using web technologies to build everything from small websites to highly interactive apps for web, mobile and desktop.';

  constructor(seoService: SeoService) {
    seoService.setSocialMediaTags(
      '',
      'Web developer from Yaounde, Cameroon',
      'I am a web developer from Yaounde, Cameroon. I enjoy using web technologies to build everything from small websites to highly interactive apps for web, mobile and desktop.',
    );
  }
}
