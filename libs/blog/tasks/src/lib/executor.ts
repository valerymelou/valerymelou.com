import { PromiseExecutor } from '@nx/devkit';
import { RoutesExecutorSchema } from './schema';
import { createClient } from 'contentful';
import { writeFileSync } from 'fs';

const runExecutor: PromiseExecutor<RoutesExecutorSchema> = async (options) => {
  const space = process.env['VM_CONTENTFUL_SPACE'] || '';
  const accessToken = process.env['VM_CONTENTFUL_ACCESS_TOKEN'] || '';
  const environment = process.env['VM_CONTENTFUL_ENVIRONMENT'] || '';
  const cdaClient = createClient({ space, accessToken, environment });
  const defaultQuery: { [key: string]: string } = {
    content_type: 'article',
    limit: options.limit?.toString() ?? '10',
    order: options.order ?? '-fields.publishedAt',
  };
  const entries = await cdaClient.getEntries(defaultQuery);
  const routes = entries.items.map(
    (entry) =>
      `/blog/${(entry.fields['publishedAt'] as string).split('T')[0]}-${entry.fields['slug']}`,
  );
  const routesString = routes.join('\n');

  writeFileSync(options.outputPath, routesString);
  console.log(
    `Successfully wrote ${routes.length} routes to ${options.outputPath}`,
  );

  return {
    success: true,
  };
};

export default runExecutor;
