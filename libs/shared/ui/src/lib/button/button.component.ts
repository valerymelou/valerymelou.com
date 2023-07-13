import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

/**
 * List of attributes that can be used to add ButtonComponent instances on
 * host attributes to style different variants.
 */
const BUTTON_HOST_ATTRIBUTES: string[] = [
  'ui-raised-button',
  'ui-stroked-button',
];

/**
 * Classes that can be added on host attribute per variant and per host attribute.
 */
const BUTTON_STYLE_CLASSES: { [name: string]: { [name: string]: string } } = {
  'ui-raised-button': {
    default:
      'bg-white text-gray-900 shadow hover:bg-gray-200 focus:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 font-medium',
    primary:
      'bg-primary-base text-white shadow border-transparent hover:bg-primary-active focus:bg-primary-active disabled:bg-gray-300 disabled:text-gray-500',
    accent:
      'bg-accent-base text-primary-active shadow border-transparent hover:bg-accent-active focus:bg-accent-active disabled:bg-gray-300 disabled:text-gray-500 font-medium',
  },
  'ui-stroked-button': {
    default:
      'bg-white text-gray-900 hover:bg-gray-200 focus:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 font-medium',
    accent:
      'text-accent-base border-accent-base focus:bg-accent-active focus:text-white hover:bg-accent-active hover:text-white',
  },
};

@Component({
  selector: `button[ui-button], button[ui-raised-button], button[ui-stroked-button],
             a[ui-button], a[ui-raised-button], a[ui-stroked-button]`,
  exportAs: 'uiButton',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  standalone: true,
})
export class ButtonComponent implements AfterViewInit {
  @Input() color = '';
  @Input() disabled = false;
  @Input() isLarge = false;
  @Input() isFull = false;
  @HostBinding('attr.disabled') get valid() {
    return this.disabled ? 'disabled' : null;
  }

  constructor(private _elementRef: ElementRef) {
    // Add basic classes
    (this._getHostElement() as HTMLElement).classList.add(
      'inline-flex',
      'items-center',
      'justify-center',
      'leading-8',
      'rounded',
      'inline-block',
      'border',
      'transition-all',
      'duration-300',
      'hover:cursor-pointer'
    );
  }

  ngAfterViewInit(): void {
    const padding = this.isLarge
      ? 'px-7 py-3 text-xl font-medium'
      : 'py-1 px-4 h-8';
    this._addToClassList(padding);
    this.color = this._hasHostAttributes('disabled')
      ? 'disabled'
      : this.color || 'default';
    // For each of the attributes, add text and background classes corresponding
    // to each variant
    for (const variant of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(variant)) {
        if (
          BUTTON_STYLE_CLASSES[variant] &&
          BUTTON_STYLE_CLASSES[variant][this.color]
        ) {
          this._addToClassList(BUTTON_STYLE_CLASSES[variant][this.color]);
        }
      }
    }

    if (this.isFull) {
      this._addToClassList('w-full');
    }
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  _addToClassList(className: string) {
    const classes = className.split(' ');
    (this._getHostElement() as HTMLElement).classList.add(...classes);
  }
}
