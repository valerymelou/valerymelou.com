import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import {
  FeatherGithub,
  FeatherLinkedin,
  FeatherTwitter
} from '@ng-icons/feather-icons';
import {
  HeroAtSymbol,
  HeroBriefcase,
  HeroExternalLink,
  HeroHome,
  HeroNewspaper,
  HeroMenuAlt2,
  HeroUser,
  HeroX
} from '@ng-icons/heroicons';


@NgModule({
  declarations: [],
  exports: [ NgIconsModule ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      FeatherGithub,
      FeatherLinkedin,
      FeatherTwitter,
      HeroHome,
      HeroUser,
      HeroBriefcase,
      HeroExternalLink,
      HeroAtSymbol,
      HeroNewspaper,
      HeroMenuAlt2,
      HeroX
    })
  ]
})
export class SharedModule { }
