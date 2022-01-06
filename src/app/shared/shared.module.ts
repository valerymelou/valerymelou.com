import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { HeroHome, HeroUser, HeroBriefcase, HeroAtSymbol, HeroNewspaper, HeroMenuAlt2, HeroX } from '@ng-icons/heroicons';


@NgModule({
  declarations: [],
  exports: [ NgIconsModule ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      HeroHome,
      HeroUser,
      HeroBriefcase,
      HeroAtSymbol,
      HeroNewspaper,
      HeroMenuAlt2,
      HeroX
    })
  ]
})
export class SharedModule { }
