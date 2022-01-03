import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BlogLayoutComponent } from '../layout/blog-layout/blog-layout.component';

import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogLayoutComponent,
    children: [
      {
        path: ':slug',
        component: BlogComponent,
      },
      {
        path: '**',
        component: BlogComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

