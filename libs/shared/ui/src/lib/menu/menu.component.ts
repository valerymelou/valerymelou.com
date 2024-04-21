import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  standalone: true,
})
export class MenuComponent {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<Component>;
  @Output() readonly closed = new EventEmitter<void>();
}
