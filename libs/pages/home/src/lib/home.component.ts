import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@valerymelou/shared/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './home.component.html',
  styles: ':host {display: flex; flex-direction: column; flex: 1;}',
})
export class HomeComponent {}