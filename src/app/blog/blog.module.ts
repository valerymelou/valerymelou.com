import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule],
})
export class BlogModule {}
