import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { buttonVariants, type ButtonVariants } from './variants';

@Component({
  selector: 'button[ui-button], a[ui-button]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
    '[attr.disabled]': 'disabled() || null',
  },
  template: `<ng-content />`,
})
export class Button {
  variant = input<ButtonVariants['variant']>('default');
  size = input<ButtonVariants['size']>('default');
  disabled = input<boolean>(false);

  protected computedClass = computed(() =>
    buttonVariants({
      variant: this.variant(),
      size: this.size(),
    }),
  );
}
