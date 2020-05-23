import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './post/post.component';
import { DisqusModule } from 'ngx-disqus';

@NgModule({
  declarations: [BlogComponent, PostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule,
    LayoutModule,
    SharedModule,
    DisqusModule
  ],
})
export class BlogModule {}
