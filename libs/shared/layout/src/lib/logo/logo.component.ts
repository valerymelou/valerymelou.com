import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styles: `
    /* HTML: <div class="loader"></div> */
    .loader {
      width: 40px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 2px solid #3754ed;
      animation:
        l20-1 0.8s infinite linear alternate,
        l20-2 1.6s infinite linear;
    }

    @keyframes l20-1 {
      0% {
        clip-path: polygon(
          50% 50%,
          0 0,
          50% 0%,
          50% 0%,
          50% 0%,
          50% 0%,
          50% 0%
        );
      }
      12.5% {
        clip-path: polygon(
          50% 50%,
          0 0,
          50% 0%,
          100% 0%,
          100% 0%,
          100% 0%,
          100% 0%
        );
      }
      25% {
        clip-path: polygon(
          50% 50%,
          0 0,
          50% 0%,
          100% 0%,
          100% 100%,
          100% 100%,
          100% 100%
        );
      }
      50% {
        clip-path: polygon(
          50% 50%,
          0 0,
          50% 0%,
          100% 0%,
          100% 100%,
          50% 100%,
          0% 100%
        );
      }
      62.5% {
        clip-path: polygon(
          50% 50%,
          100% 0,
          100% 0%,
          100% 0%,
          100% 100%,
          50% 100%,
          0% 100%
        );
      }
      75% {
        clip-path: polygon(
          50% 50%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          50% 100%,
          0% 100%
        );
      }
      100% {
        clip-path: polygon(
          50% 50%,
          50% 100%,
          50% 100%,
          50% 100%,
          50% 100%,
          50% 100%,
          0% 100%
        );
      }
    }
    @keyframes l20-2 {
      0% {
        transform: scaleY(1) rotate(0deg);
      }
      49.99% {
        transform: scaleY(1) rotate(135deg);
      }
      50% {
        transform: scaleY(-1) rotate(0deg);
      }
      100% {
        transform: scaleY(-1) rotate(-135deg);
      }
    }
  `,
})
export class LogoComponent {
  loading = false;

  constructor(router: Router) {
    router.events.subscribe({
      next: (event) => {
        if (
          event instanceof NavigationStart ||
          event instanceof RouteConfigLoadStart
        ) {
          this.loading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof RouteConfigLoadEnd
        ) {
          this.loading = false;
        }
      },
    });
  }
}
