import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LayoutModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
