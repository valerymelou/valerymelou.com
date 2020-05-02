import { Component, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { BlogPost } from '../blog-post';
import { SeoService } from 'src/app/core/seo.service';
import { CodeHighlightService } from 'src/app/core/code-highlight.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements AfterViewChecked {
  post: BlogPost;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private seoService: SeoService,
    private codeHighlightService: CodeHighlightService
  ) {
    combineLatest([
      this.activatedRoute.params.pipe(pluck('slug')),
      this.scully.available$
    ]).pipe(
      map(([slug, routes]) => routes.find(route => route.route.indexOf(slug) !== -1)
      )
    ).subscribe((result) => {
      this.post = {
        title: result.title,
        description: result.description,
        image: result.image,
        route: result.route,
        published: result.published,
        date: result.date,
        topics: result.topics,
      };

      this.seoService.setSocialMediaTags(this.post.route, this.post.title, this.post.description, this.post.image);
    });
  }

  ngAfterViewChecked() {
    this.codeHighlightService.highlightAll();
  }
}
