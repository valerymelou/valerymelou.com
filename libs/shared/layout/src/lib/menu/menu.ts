import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LAYOUT_NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'layout-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
})
export class Menu {
  readonly items = LAYOUT_NAV_ITEMS;
}
