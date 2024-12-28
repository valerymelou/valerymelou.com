import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCopy, bootstrapCheck } from '@ng-icons/bootstrap-icons';
import { codeToHtml } from 'shiki';
import { WINDOW_TOKEN } from '@valerymelou/common/browser';

@Component({
  selector: 'ui-code',
  imports: [CommonModule, NgIconComponent],
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ bootstrapCopy, bootstrapCheck })],
})
export class CodeComponent {
  @Input()
  set code(value: string) {
    this._code = value;
    this.inline = !value.includes('\n');
    this.highlight();
  }

  get code(): string {
    return this._code;
  }

  @Input() language!: string;
  highlightedCode!: SafeHtml;
  inline = false;

  private languages = [
    'javascript',
    'typescript',
    'html',
    'css',
    'scss',
    'shellsession',
    'python',
    'rust',
    'json',
  ];
  private _code!: string;
  copied = false;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(WINDOW_TOKEN) private window: Window,
  ) {}

  copy(): void {
    this.window.navigator.clipboard.writeText(this.code).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }

  highlight(): void {
    this.language =
      this.language ?? this.code.split('\n')[0].replace('```', '');

    if (this.languages.includes(this.language)) {
      this._code = this.code.replace('```' + this.language + '\n', '');
    } else {
      this.language = 'javascript';
    }

    codeToHtml(this.code, {
      lang: this.language,
      themes: {
        light: 'slack-ochin',
        dark: 'material-theme-ocean',
      },
      transformers: [
        {
          pre(node) {
            this.addClassToHast(node, 'overflow-x-auto');
          },
        },
      ],
    }).then((highlightedCode) => {
      this.highlightedCode =
        this.sanitizer.bypassSecurityTrustHtml(highlightedCode);
    });
  }
}
