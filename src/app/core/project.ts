/**
 * Project class to hold project data
 *
 * Can construct a new Project instance from Contentful entry entry.
 */
export class Project {
  public name: string;
  public description: string;
  public repository?: string;
  public demo?: string;
  public preview: string;
  public tags: string[];

  constructor(entry: any) {
    const tags: string[] = [];
    if (entry.metadata.tags) {
      entry.metadata.tags.forEach((tag: any) => {
        tags.push(tag.sys.id);
      });
    }

    this.name = entry.fields.name;
    this.description = entry.fields.description;
    this.repository = entry.fields.repository;
    this.demo = entry.fields.demo;
    this.preview = 'https:' + entry.fields.preview.fields.file.url + '?w=580&h=360&fit=scale';
    this.tags = tags;
  }
}
