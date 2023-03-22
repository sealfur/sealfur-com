//=====This is the eleventy config file==========
// RSS Plugin
const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

//Rating Order
const sortByRatingOrder = require('./src/utils/sort-by-rating.js');

//Markdown-it features
const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAnchor = require('markdown-it-anchor');
const options = {
  html: true,
  //breaks: true,
  //linkify: true,
  typographer: true,
};

module.exports = (config) => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Plugins
  config.addPlugin(rssPlugin);

  // ----Set directories to pass through to the dist folder
  config.addPassthroughCopy('.src/images/');

  // ------Markdown overrides----
  const markdownLib = markdownIt(options).use(markdownItFootnote).use(markdownItAnchor);

  config.setLibrary('md', markdownLib);

  // ===Collections=== //
  // . => blog posts  … … … … see [eleventy from scratch lesson](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/11/)
  // . . Returns a collection of blog posts in reverse date order
  config.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')]
      .filter((post) => !post.data.draft)
      .reverse();
  });

  // . => clippings
  // . . Returns clippings, sorted by rating
  config.addCollection('clippings', (collection) => {
    return sortByRatingOrder(
      collection.getFilteredByGlob('./src/clippings/*.md')
    );
  });
  // Returns clippings filtered by "featured: true"
  config.addCollection('featuredClippings', (collection) => {
    return sortByRatingOrder(
      collection.getFilteredByGlob('./src/clippings/*.md')
    ).filter((x) => x.data.featured);
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  // from [eleventy from scratch](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/19/)
  config.setUseGitIgnore(false);

  // see 11ty from scratch lesson 8 for [creating "featured" collections with this kind of filter](hhttps://piccalil.li/course/learn-eleventy-from-scratch/lesson/8/#heading-refactoring-our-collections)

  // Creating redirect string parsing see [Setting up page redirects with 11ty and Netlify](https://willvincent.com/2022/07/27/redirects-with-11ty-and-netlify/)

  config.addFilter('is_string', function(obj) {
    return typeof obj == 'string'
  });

  return {
    markdownTemplateEngine: 'njk', //using nunjucks as templating engine
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
