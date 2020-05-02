import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  template: 'social links'
})
export class MockSocialLinksComponent {
  @Input() scheme = 'light';
}
