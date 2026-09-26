import { NgOptimizedImage } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  remixTwitterXLine,
  remixLinkedinBoxFill,
  remixGithubFill,
} from '@ng-icons/remixicon';
import { radixEnvelopeClosed } from '@ng-icons/radix-icons';

import { Button } from '@vm/shared/ui';

@Component({
  selector: 'layout-hero',
  imports: [NgOptimizedImage, Button, NgIconComponent],
  viewProviders: [
    provideIcons({
      remixTwitterXLine,
      remixLinkedinBoxFill,
      remixGithubFill,
      radixEnvelopeClosed,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './hero.html',
})
export class Hero {}
