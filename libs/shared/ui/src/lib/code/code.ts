import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixCopy, radixCheck } from '@ng-icons/radix-icons';
import { codeToHtml } from 'shiki';
import { WINDOW_TOKEN } from '@vm/common/browser';
import { Button } from '../button';

@Component({
  selector: 'ui-code',
  imports: [CommonModule, NgIconComponent, Button],
  templateUrl: './code.html',
  styleUrls: ['./code.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ radixCopy, radixCheck })],
})
export class Code {
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
  copied = false;

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
    'yaml',
    'ruby',
    'pwershell',
  ];
  private _code!: string;
  private sanitizer = inject(DomSanitizer);
  private window = inject(WINDOW_TOKEN);

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

    const isBlock = !this.inline;

    codeToHtml(this.code, {
      lang: this.language,
      themes: {
        light: 'one-light',
        dark: 'material-theme-ocean',
      },
      transformers: [
        {
          pre(node) {
            this.addClassToHast(node, 'overflow-x-auto');
            if (isBlock) {
              this.addClassToHast(node, 'has-line-numbers');
            }
          },
        },
      ],
    }).then((highlightedCode) => {
      this.highlightedCode =
        this.sanitizer.bypassSecurityTrustHtml(highlightedCode);
    });
  }
}
