import { Component } from '@angular/core';
import { SeoService } from 'src/app/core/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  title = 'Contact';
  strap = 'If you are interested in working with me or just want to say hi, please send me a message. I will reply as soon as possible.';

  constructor(seoService: SeoService) {
    seoService.setSocialMediaTags(
      '/contact',
      'Contact',
      'Have a project in mind or just want to say hi? Please get in touch with me.'
    );
  }
}
