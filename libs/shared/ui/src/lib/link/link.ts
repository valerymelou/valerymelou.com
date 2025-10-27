import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'a[ui-link]',
  imports: [CommonModule],
  templateUrl: './link.html',
})
export class Link {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  constructor() {
    // Button base classes:
    this.getHostElement().classList.add(
      'text-accent-base',
      'text-blue',
      'font-medium',
      'transition-all',
      'duration-300',
      'ease-in-out',
    );
  }

  /**
   * Returns the host element.
   * @returns The host element.
   */
  private getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
