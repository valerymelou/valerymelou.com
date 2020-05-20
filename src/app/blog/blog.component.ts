import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES, ParamMap} from '@angular/router';
import { BlogPost } from './blog-post';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { SeoService } from '../core/seo.service';
import { map, pluck, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { SlugifyPipe } from '../shared/pipes/slugify.pipe';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogComponent implements OnInit {
  title = 'Blog';
  strap = 'Welcome to my blog! I write about Django, Angular, Symfony, Vue.js and everything else that matters to me.';
  subtitle = 'All posts';
  blogPosts: BlogPost[] = [];
  topics: Set<string> = new Set();

  ngOnInit() {}

  constructor(
    activatedRoute: ActivatedRoute,
    scully: ScullyRoutesService,
    seoService: SeoService,
    private slugify: SlugifyPipe
  ) {
    seoService.setSocialMediaTags('/blog', 'Blog', this.strap);
    activatedRoute.paramMap.subscribe(() => {
      this.blogPosts = [];
    });

    combineLatest([
      activatedRoute.params.pipe(pluck('topic')),
      scully.available$
    ]).pipe(map(([topic, routes]) => routes.filter((route: ScullyRoute) => {
      if (route.published === true && route.topics && route.topics instanceof Array) {
        route.topics.forEach((t => this.topics.add(t)));
      }

      if (topic) {
        if (route.topics && route.topics.length !== 0) {
          const inTopic = route.topics.some(t => {
            const answer = slugify.transform(t) === slugify.transform(topic);
            if (answer) {
              this.subtitle = `Posts in ${t}`;
            }

            return answer;
          });

          return inTopic && route.published === true;
        }

        return false;
      }

      return route.published === true;
    })),
    map(posts => posts.sort((a, b) => {
      const firstDate = new Date(a.date);
      const secondDate = new Date(b.date);

      return firstDate < secondDate ? 1 : -1;
    })))
    .subscribe(results => {
      results.forEach(result => {
        const post: BlogPost = {
          title: result.title,
          description: result.description,
          image: result.image,
          date: result.date,
          route: result.route,
          published: result.published,
          topics: result.topics
        };

        this.blogPosts.push(post);
      });
    });
  }
}
