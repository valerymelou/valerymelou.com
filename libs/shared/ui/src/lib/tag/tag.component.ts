import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const TAG_STYLE_CLASSES: { [key: string]: string } = {
  default: 'bg-slate-200 px-3 py-1 font-thin hover:bg-slate-300',
};

@Component({
  selector: 'a[ui-tag], span[ui-tag], label[ui-tag]',
  exportAs: 'uiTag',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
})
export class TagComponent implements AfterViewInit {
  @Input() color = '';

  constructor(private _elementRef: ElementRef) {
    (this._getHostElement() as HTMLElement).classList.add('rounded-full');
  }

  ngAfterViewInit(): void {
    this.color = this.color || 'default';
    this._addToClassList(TAG_STYLE_CLASSES[this.color]);
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _addToClassList(className: string) {
    const classes = className.split(' ');
    (this._getHostElement() as HTMLElement).classList.add(...classes);
  }
}
