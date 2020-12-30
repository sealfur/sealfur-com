//=====This is the eleventy config file==========

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

  //---Returns all clippings sorted by "rating"
  //   which will be in the front-matter of all clippings.
  //   They will probably flow by 
  config.addCollection('clippings', (collection) => {
    return collection
      .getFilteredByGlob('./src/clippings/*.md')
      .sort((a, b) =>
        Number(a.data.rating) > Number(b.data.rating) ? 1 : -1
      );
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
