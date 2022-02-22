import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';
import { Results } from './results';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentfulSpaceId,
    accessToken: environment.contentfulAccessToken
  })

  constructor() { }

  getProjects(query: Object = {}): Observable<Results<Project>> {
    const entries = this.client.getEntries({
      content_type: environment.contentfulProjectContentTypeId,
      ...query
    });

    return from(entries).pipe(
      map((entries: any) => {
        const results: Results<Project> = {
          items: [],
          total: entries.total,
          skip: entries.skip,
          limit: entries.limit
        };
        if (entries && entries.items.length) {
          entries.items.forEach((entry: any) => {
            const project: Project = {
              name: entry.fields.name,
              description: entry.fields.description,
              repository: entry.fields.repository,
              demo: entry.fields.demo,
              preview: 'https:' + entry.fields.preview.fields.file.url
            };
            results.items.push(project);
          })
        }

        return results;
      })
    );
  }
}
