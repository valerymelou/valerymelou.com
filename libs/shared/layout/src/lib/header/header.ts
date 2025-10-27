import { Location } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixMoonLine, remixSunLine } from '@ng-icons/remixicon';
import { radixChevronLeft } from '@ng-icons/radix-icons';

import { Button } from '@vm/shared/ui';
import { ThemeService } from '@vm/shared/theming';
import { WINDOW_TOKEN } from '@vm/common/browser';

@Component({
  selector: 'layout-header',
  imports: [NgIconComponent, Button],
  viewProviders: [
    provideIcons({
      radixChevronLeft,
      remixSunLine,
      remixMoonLine,
    }),
  ],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  backButton = input<boolean>(false);
  theme: 'light' | 'dark' = 'light';

  private themeService = inject(ThemeService);
  private router = inject(Router);
  private location = inject(Location);
  private window = inject(WINDOW_TOKEN);

  ngOnInit() {
    this.themeService.getTheme().subscribe({
      next: (theme) => {
        if (theme === 'dark' || theme === 'light') {
          this.theme = theme;
        }
      },
    });
  }

  toggleTheme() {
    this.themeService.changeTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  goBack(): void {
    // Prefer going back only if the Angular router has prior navigation entries.
    // Angular injects a navigationId into history.state starting at 1.
    const navId = this.window?.history?.state?.navigationId ?? 0;
    if (navId > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
