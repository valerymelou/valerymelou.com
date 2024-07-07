import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'a[ui-link]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link.component.html',
})
export class LinkComponent {
  constructor(private _elementRef: ElementRef<HTMLElement>) {
    // Button base classes:
    this.getHostElement().classList.add(
      'text-accent-base',
      'dark:text-white',
      'dark:hover:text-accent-base',
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
