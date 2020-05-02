import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { MetaTag } from './meta-tag';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultImage = '/brand/social-image.png';
  private ogUrlMeta = 'og:url';
  private ogTitleMeta = 'og:title';
  private ogDescriptionMeta = 'og:description';
  private ogImageMeta = 'og:image';
  private ogSecureImageMeta = 'og:image:secure_url';
  private twitterTitleMeta = 'twitter:title';
  private twitterDescription = 'twitter:description';
  private twitterImageMeta = 'twitter:image';
  private descriptionMeta = 'description';

  constructor(private titleService: Title, private metaService: Meta) { }

  public setSocialMediaTags(path: string, title: string, description: string, image?: string) {
    path = `${environment.domain}${path}`;
    image = image ? image : this.defaultImage;
    const imageUrl = `${environment.domain}/assets/images${image}`;
    const metaTags: MetaTag[] = [
      new MetaTag(this.ogUrlMeta, path, true),
      new MetaTag(this.ogTitleMeta, title, true),
      new MetaTag(this.ogDescriptionMeta, description, true),
      new MetaTag(this.ogImageMeta, imageUrl, true),
      new MetaTag(this.ogSecureImageMeta, imageUrl, true),
      new MetaTag(this.twitterTitleMeta, title, false),
      new MetaTag(this.twitterDescription, description, false),
      new MetaTag(this.twitterImageMeta, imageUrl, false),
      new MetaTag(this.descriptionMeta, description, false)
    ];

    this.setTitle(`${title} : ${environment.siteName}`);
    this.setMetaTags(metaTags);
  }

  private setMetaTags(metaTags: MetaTag[]): void {
    metaTags.forEach((metaTag: MetaTag) => {
      const tag = metaTag.isOpenGraph ?  this.metaService.getTag(`property='${metaTag.name}'`) : this.metaService.getTag(`name='${metaTag.name}'`);

      if (metaTag.isOpenGraph) {
        this.metaService.updateTag({ property: metaTag.name, content: metaTag.value });
      } else {
        this.metaService.updateTag({ name: metaTag.name, content: metaTag.value });
      }
    });
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
