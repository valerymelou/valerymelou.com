import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Button } from '@vm/shared/ui';

import {
  remixTwitterXLine,
  remixLinkedinBoxFill,
  remixGithubFill,
} from '@ng-icons/remixicon';
import { radixEnvelopeClosed } from '@ng-icons/radix-icons';

@Component({
  selector: 'layout-footer',
  imports: [Button, NgIconComponent],
  viewProviders: [
    provideIcons({
      remixTwitterXLine,
      remixLinkedinBoxFill,
      remixGithubFill,
      radixEnvelopeClosed,
    }),
  ],
  templateUrl: './footer.html',
})
export class Footer {
  date = new Date();
}
