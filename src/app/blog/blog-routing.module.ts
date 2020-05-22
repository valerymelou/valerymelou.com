import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlogComponent} from './blog.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {
      animation: 'BlogPage'
    }
  },
  {
    path: 'topics/:topic',
    component: BlogComponent,
    data: {
      animation: 'BlogPage'
    }
  },
  {
    path: ':slug',
    component: PostComponent,
    data: {
      animation: 'BlogPage'
    }
  },
  {
    path: '**',
    component: BlogComponent,
    data: {
      animation: 'BlogPage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

