export class Image {
  public title: string;
  public description: string;
  public url: string;
  public height: number;
  public width: number;

  constructor(entry: any) {
    this.title = entry.fields.title;
    this.description = entry.fields.description;
    this.url = entry.fields.file.url + '?w=550&h=330&fit=scale';
    this.height = entry.fields.file.details.image.height;
    this.width = entry.fields.file.details.image.width;
  }
}
