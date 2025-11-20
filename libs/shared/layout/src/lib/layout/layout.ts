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
import { LAYOUT_NAV_ITEMS } from '../nav-items';

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
  private touchStartX = 0;
  private touchStartY = 0;
  private ignoreSwipe = false;
  private readonly swipeThreshold = 40; // pixels

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

  // Swipe navigation at the layout level (anywhere on screen)
  onTouchStart(ev: TouchEvent) {
    if (!ev.touches || ev.touches.length === 0) return;

    const target = ev.target as HTMLElement;
    if (target.closest('pre') || target.closest('ui-code')) {
      this.ignoreSwipe = true;
      return;
    }
    this.ignoreSwipe = false;

    const t = ev.touches[0];
    this.touchStartX = t.clientX;
    this.touchStartY = t.clientY;
  }

  onTouchEnd(ev: TouchEvent) {
    if (this.ignoreSwipe) return;
    if (!ev.changedTouches || ev.changedTouches.length === 0) return;
    const t = ev.changedTouches[0];
    const dx = t.clientX - this.touchStartX;
    const dy = t.clientY - this.touchStartY;

    if (Math.abs(dx) < this.swipeThreshold || Math.abs(dx) < Math.abs(dy)) {
      return; // ignore short or mostly-vertical gestures
    }

    const items = LAYOUT_NAV_ITEMS;
    const url = this.router.url || '/';
    const current = items.findIndex((item) =>
      item.path === '/' ? url === '/' : url.startsWith(item.path),
    );
    const cur = current >= 0 ? current : 0;

    let next = cur;
    if (dx < 0) {
      next = Math.min(cur + 1, items.length - 1);
    } else {
      next = Math.max(cur - 1, 0);
    }

    if (next !== cur) {
      this.router.navigateByUrl(items[next].path);
    }
  }
}
