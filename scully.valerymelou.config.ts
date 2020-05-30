const {registerPlugin, logError, routeSplit} = require('@scullyio/scully');
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';

function topicsPlugin(route, config = {}) {
  const routes = [];

  if (config && config.topics && config.topics instanceof Array) {
    config.topics.forEach(topic => routes.push({ route: `/blog/topics/${topic}`}));
  } else {
    logError(`Invalid argument in route: ${route}. Skipping`);

    return [{route, type: config.type}];
  }

  return Promise.resolve(routes);
}

registerPlugin('router', 'topics', topicsPlugin);

const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://valerymelou.com',
    sitemapFilename: 'sitemap.xml',
    changeFreq: 'monthly',
    priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
    ignoredRoutes: ['/404']
});

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'valerymelou',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog'
      }
    },
    '/blog/topics/:topic': {
      type: 'topics',
      topics: ['django', 'python', 'javascript', 'operating-systems']
    }
  }
};
