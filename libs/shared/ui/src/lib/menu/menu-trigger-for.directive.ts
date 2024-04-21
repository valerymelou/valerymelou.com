import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Observable, of, Subscription } from 'rxjs';
import { MenuPanel } from './menu-panel';
import { MenuPositionX, MenuPositionY } from './positions';

@Directive({
  selector: '[uiMenuTriggerFor]',
  standalone: true,
})
export class MenuTriggerForDirective implements OnDestroy {
  private isMenuOpen = false;
  private overlayRef?: OverlayRef;
  private menuClosingActionsSub = Subscription.EMPTY;
  @Input('uiMenuTriggerFor') menuPanel!: MenuPanel;
  @Input() xPosition: MenuPositionX = 'before';
  @Input() yPosition: MenuPositionY = 'below';
  @Input() yOffset = 0;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('click')
  toggleDropdown(): void {
    this.isMenuOpen ? this.destroyMenu() : this.openMenu();
  }

  openMenu(): void {
    this.isMenuOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: this.xPosition === 'before' ? 'start' : 'end',
            originY: this.yPosition === 'below' ? 'bottom' : 'top',
            overlayX: this.xPosition === 'before' ? 'start' : 'end',
            overlayY: this.yPosition === 'below' ? 'top' : 'bottom',
            offsetY: this.yPosition === 'below' ? this.yOffset : -8,
          },
        ]),
    });

    const templatePortal = new TemplatePortal(
      this.menuPanel.templateRef,
      this.viewContainerRef,
    );

    this.overlayRef.attach(templatePortal);

    this.menuClosingActionsSub = this.menuClosingActions().subscribe({
      next: () => this.destroyMenu(),
    });
  }

  private menuClosingActions(): Observable<MouseEvent | unknown> {
    if (this.overlayRef) {
      const menuClosed = this.menuPanel.closed;
      const backdropClick$ = this.overlayRef.backdropClick();
      const detachment$ = this.overlayRef.detachments();
      return merge(backdropClick$, detachment$, menuClosed);
    }

    return of();
  }

  private destroyMenu(): void {
    this.menuClosingActionsSub.unsubscribe();
    this.isMenuOpen = false;
    this.overlayRef?.detach();
  }

  ngOnDestroy() {
    this.overlayRef?.dispose();
  }
}
