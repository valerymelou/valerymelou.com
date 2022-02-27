import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';
import { Results } from './results';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private url = `https://cdn.contentful.com/spaces/${environment.contentfulSpaceId}/environments/${environment.contentfulEnvironment}`;

  constructor(private http: HttpClient) { }

  getProjects(query: Object = {}): Observable<Results<Project>> {
    return this.http.get<Results<Project>>(
      `${this.url}/entries?content_type=${environment.contentfulProjectContentTypeId}`,
      {
        headers: { 'Authorization': `Bearer ${environment.contentfulAccessToken}` }
      }
    )
    .pipe(
      map((entries: any) => {
          const results: Results<Project> = {
            items: [],
            total: entries.total,
            skip: entries.skip,
            limit: entries.limit
          };
          entries.items.forEach((entry: any) => {
            if (entry?.fields?.preview?.sys?.linkType === 'Asset' && entries.includes.Asset) {
              // Only linked assets are relevant in this project
              const image = entries.includes.Asset.find((asset: any) => asset.sys.id === entry.fields.preview.sys.id);
              entry.fields.preview = image;
            }
            const project = new Project(entry);
            results.items.push(project);
          })
          return results;
      })
    );
  }
}
