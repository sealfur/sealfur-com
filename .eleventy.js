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
  // ------Markdown overrides----

  config.setLibrary('md', markdownLib);

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
