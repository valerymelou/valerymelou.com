import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { clsx } from 'clsx';

@Component({
  selector: '[ui-skeleton]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
  },
  template: ``,
})
export class Skeleton {
  className = input<string>('');

  protected computedClass = computed(() => {
    return clsx('animate-pulse rounded-md bg-muted', this.className());
  });
}
