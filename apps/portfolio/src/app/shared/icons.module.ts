import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { heroBars3BottomRight, heroXMark } from '@ng-icons/heroicons/outline';

@NgModule({
  exports: [NgIconsModule],
  imports: [
    NgIconsModule.withIcons({
      heroBars3BottomRight,
      heroXMark
    })
  ]
})
export class IconsModule {}
