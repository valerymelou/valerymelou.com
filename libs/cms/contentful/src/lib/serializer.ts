import { Entry, EntrySkeletonType } from 'contentful';
import { BaseEntry } from '@vmelou/cms/core';
import { CmsMetadata, cmsPropertyMetadataKey } from '@vmelou/cms/core';

export class Serializer {
  private isPrimitive(obj: unknown): boolean {
    // Primitive types are string, number and boolean.
    switch (typeof obj) {
      case 'string':
      case 'number':
      case 'boolean':
        return true;
    }

    return !!(
      obj instanceof String ||
      obj === String ||
      obj instanceof Number ||
      obj === Number ||
      obj instanceof Boolean ||
      obj === Boolean
    );
  }

  private getClass(target: BaseEntry, propertyKey: string): unknown {
    return Reflect.getMetadata('design:type', target, propertyKey);
  }

  private getProperty(target: BaseEntry, propertyKey: string): CmsMetadata {
    return Reflect.getMetadata(cmsPropertyMetadataKey, target, propertyKey);
  }

  deserialize<E extends BaseEntry>(
    cls: { new (): E },
    data: Entry<EntrySkeletonType, undefined, string>
  ): E {
    const obj = new cls();
    for (const key in obj) {
      const propertyMetadataFunction: (arg0: CmsMetadata) => unknown = (
        propertyMetadata
      ) => {
        const propertyName = propertyMetadata.name || key;
        const cls = this.getClass(obj, key);
        if (cls && !this.isPrimitive(cls)) {
          // Property is not a primitive
          if (data.fields[key]) {
            return this.deserialize(
              cls as { new (): E },
              data.fields[key] as Entry<EntrySkeletonType, undefined, string>
            );
          }

          return undefined;
        } else {
          return data.fields[propertyName];
        }
      };

      const propertyMetadata: CmsMetadata = this.getProperty(obj, key);
      if (propertyMetadata) {
        obj[key] = propertyMetadataFunction(propertyMetadata) as E[Extract<
          keyof E,
          string
        >];
      } else {
        if (data.fields[key] !== undefined) {
          obj[key] = data.fields[key] as E[Extract<keyof E, string>];
        }
      }
    }

    obj.createdAt = data.sys.createdAt;
    obj.updatedAt = data.sys.updatedAt;
    obj.id = data.sys.id;
    return obj;
  }
}
