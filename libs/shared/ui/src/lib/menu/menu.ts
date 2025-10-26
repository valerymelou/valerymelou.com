import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.html',
  standalone: true,
})
export class Menu {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<Component>;
  @Output() readonly closed = new EventEmitter<void>();
}
