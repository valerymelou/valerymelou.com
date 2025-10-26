import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationError,
  ResolveEnd,
  ResolveStart,
  Router,
  RouterOutlet,
} from '@angular/router';

import { Subscription } from 'rxjs';
import { Skeleton } from '@vm/shared/ui';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Hero } from '../hero/hero';
import { Intro } from '../intro/intro';
import { Menu } from '../menu/menu';

@Component({
  selector: 'layout-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    Footer,
    Header,
    Hero,
    Intro,
    Menu,
    Skeleton,
  ],
  templateUrl: './layout.html',
})
export class Layout implements OnDestroy {
  loading = false;
  hasChild = false;
  private routerSubscription: Subscription;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.routerSubscription = this.router.events.subscribe({
      next: (event: Event) => {
        this.hasChild = this.route.snapshot.firstChild?.data['child'];
        if (event instanceof ResolveStart) {
          this.loading = true;
        }

        if (
          event instanceof ResolveEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loading = false;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
