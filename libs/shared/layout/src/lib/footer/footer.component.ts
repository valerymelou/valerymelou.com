import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '@valerymelou/shared/ui';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LinkComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
