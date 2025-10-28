import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

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
  templateUrl: './hero.html',
})
export class Hero {}
