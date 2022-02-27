import { Image } from "./image";

export class Project {
  public name: string;
  public description: string;
  public repository?: string;
  public demo?: string;
  public preview: Image;
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
    this.preview = new Image(entry.fields.preview);
    this.tags = tags;
  }
}
