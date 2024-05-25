import { Asset as ContentfulAsset, AssetFile } from 'contentful';

export class Asset {
  title = '';
  description = '';
  contentType = '';
  filename = '';
  url = '';

  static fromAsset(entry: ContentfulAsset): Asset {
    const asset = new Asset();
    asset.title = entry.fields['title'] as string;
    asset.description = entry.fields['description'] as string;
    asset.contentType = (entry.fields['file'] as AssetFile).contentType;
    asset.filename = (entry.fields['file'] as AssetFile).fileName;
    asset.url = (entry.fields['file'] as AssetFile).url;

    return asset;
  }
}
