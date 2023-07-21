import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'blog-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
