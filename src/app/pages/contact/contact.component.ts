import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  title = 'Contact';
  strap = 'If you are interested in working with me or just want to say hi, please send me a message. I will reply as soon as possible.';

  constructor() { }
}
