//=====This is the eleventy config file==========

module.exports = (config) => {
  return {
    markdownTemplateEngine: 'njk', //using nunjucks as templating engine
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
