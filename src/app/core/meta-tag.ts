export class MetaTag {
  name: string;
  value: string;
  isOpenGraph: boolean;

  constructor(name: string, value: string, isOpenGraph: boolean) {
    this.name = name;
    this.value = value;
    this.isOpenGraph = isOpenGraph;
  }
}
