import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * List of attributes that can be used to add ButtonComponent instances on
 * host attributes to style different variants.
 */
const BUTTON_HOST_ATTRIBUTES: string[] = ['ui-flat-button'];

/**
 * Classes that can be added on host attribute per variant and per host attribute.
 */
const BUTTON_STYLE_CLASSES: { [name: string]: { [name: string]: string } } = {
  'ui-flat-button': {
    default:
      'bg-white text-black disabled:text-black disabled:text-opacity-50 disabled:bg-white disabled:bg-opacity-50 disabled:cursor-default',
    accent:
      'bg-accent-base text-white disabled:text-white disabled:text-opacity-50 disabled:bg-accent-base disabled:bg-opacity-50 disabled:cursor-default',
  },
};

/**
 * Button component.
 * Provides a standard button with different variants.
 */
@Component({
  selector: 'button[ui-flat-button], a[ui-flat-button]',
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent implements AfterViewInit {
  @Input() color: 'default' | 'primary' | 'accent' | 'secondary' = 'default';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) large = false;
  @Input({ transform: booleanAttribute }) full = false;
  @HostBinding('attr.disabled') get valid() {
    return this.disabled ? 'disabled' : null;
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    // Button base classes:
    this.getHostElement().classList.add(
      'inline-flex',
      'items-center',
      'justify-center',
      'leading-8',
      'rounded-full',
      'transition-all',
      'duration-300',
      'font-semibold',
    );
  }

  ngAfterViewInit(): void {
    // Add classes for button variant:
    BUTTON_HOST_ATTRIBUTES.forEach((hostAttribute) => {
      if (this.hasHostAttributes(hostAttribute)) {
        this.addToClassList(BUTTON_STYLE_CLASSES[hostAttribute][this.color]);
      }
    });

    // Add classes for button size:
    if (this.large) {
      this.addToClassList('px-8 py-4 text-lg');
    } else {
      this.addToClassList('px-4 py-3 text-sm leading-[18px]');
    }

    // Add classes for button width:
    if (this.full) {
      this.addToClassList('w-full');
    }
  }

  /**
   * Returns the host element.
   * @returns The host element.
   */
  private getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /**
   * Checks if the host element has one of the given attributes.
   * @param attributes
   * @returns boolean
   */
  private hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this.getHostElement().hasAttribute(attribute),
    );
  }

  /**
   * Adds the given classes to the host element.
   * @param className
   */
  private addToClassList(className: string): void {
    const classes = className.split(' ');
    this.getHostElement().classList.add(...classes);
  }
}
