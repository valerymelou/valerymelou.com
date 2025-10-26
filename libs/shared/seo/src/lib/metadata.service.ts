import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { WINDOW_TOKEN } from '@vm/common/browser';

import { DEFAULT_METADATA } from './constants';
import { PageMetadata } from './page-metadata';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private readonly window = inject(WINDOW_TOKEN);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  updateMetadata(metadata: Partial<PageMetadata>, index = true): void {
    const pageMetadata: PageMetadata = { ...DEFAULT_METADATA, ...metadata };
    const metaTags: MetaDefinition[] = [
      { name: 'robots', content: index ? 'index, follow' : 'noindex' },
      ...this.generateMetaDefinitions(pageMetadata),
    ];

    metaTags.forEach((tag: MetaDefinition) => {
      if (tag.content) {
        this.meta.updateTag(tag);
      }
    });

    this.title.setTitle(`${metadata.title}`);
  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    return [
      // Standard
      { name: 'title', content: metadata.title },
      { name: 'description', content: metadata.description },
      { name: 'keywords', content: metadata.keywords.join(', ') },
      // og
      ...this.generateOgMetaDefinitions(metadata),
      // Twitter
      ...this.generateXMetaDefinitions(metadata),
    ];
  }

  private generateOgMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    const imageUrl = this.buildImageUrl(metadata.image);
    return [
      { name: 'og:url', content: this.window.location.href },
      { property: 'og:title', content: metadata.title },
      { property: 'og:description', content: metadata.description },
      { property: 'og:type', content: metadata.type },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:secure_url', content: imageUrl },
      { property: 'og:image:alt', content: metadata.imageAlt },
    ];
  }

  private generateXMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    const imageUrl = this.buildImageUrl(metadata.image);
    return [
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@valerymelou' },
      { name: 'twitter:title', content: metadata.title },
      { name: 'twitter:description', content: metadata.description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: metadata.imageAlt },
    ];
  }

  private buildImageUrl(image: string): string {
    if (image.startsWith('//')) {
      return `https:${image}`;
    }

    return image.startsWith('http') || image.startsWith('//')
      ? image
      : this.window.location.origin + image;
  }
}
