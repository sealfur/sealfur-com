//=====This is the eleventy config file==========
const sortByRatingOrder = require('./src/utils/sort-by-rating.js');

//Markdown-it features
const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const options = {
  html: true,
  //breaks: true,
  //linkify: true,
  typographer: true,
};
const markdownLib = markdownIt(options).use(markdownItFootnote);

module.exports = (config) => {
  // ----Set directories to pass through to the dist folder
  config.addPassthroughCopy('.src/images/');

  // ------Markdown overrides----
  config.setLibrary('md', markdownLib);

  // Returns clippings, sorted by rating
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

  // see 11ty from scratch lesson 8 for [creating "featured" collections with this kind of filter](hhttps://piccalil.li/course/learn-eleventy-from-scratch/lesson/8/#heading-refactoring-our-collections)

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
