import { TemplateRef, EventEmitter, Component } from '@angular/core';

export interface MenuPanel {
  templateRef: TemplateRef<Component>;
  readonly closed: EventEmitter<void>;
}
