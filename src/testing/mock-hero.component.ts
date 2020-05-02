import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: 'hero'
})
export class MockHeroComponent {
  @Input() full = true;
  @Input() title = 'Home';
  @Input() strap = 'This is the Home';
}
