import 'reflect-metadata';

export const cmsPropertyMetadataKey = Symbol('cmsProperty');

export interface CmsMetadata {
  name?: string;
  cls?: unknown;
}

export function CmsProperty(metadata: string, cls?: unknown): any {
  return Reflect.metadata(cmsPropertyMetadataKey, { name: metadata, cls });
}

export function CmsEntry(...types: string[]): any {
  return Reflect.metadata('design:paramtypes', types);
}
