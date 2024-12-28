import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '@valerymelou/shared/ui';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, LinkComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  date = new Date();
}
