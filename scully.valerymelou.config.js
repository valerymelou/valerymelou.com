const {registerPlugin, logError, routeSplit} = require('@scullyio/scully');

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

exports.config = {
  projectRoot: "./src",
  projectName: "valerymelou",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
    '/blog/topics/:topic': {
      type: 'topics',
      topics: ['angular', 'django', 'python', 'javascript']
    }
  }
};
