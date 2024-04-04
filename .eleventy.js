//=====This is the eleventy config file==========

// Eleventy (11ty) Plugins
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");

// Filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

//Rating Order
const sortByRatingOrder = require("./src/utils/sort-by-rating.js");

//Markdown-it features
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownitDeflist = require("markdown-it-deflist");
const markdownItAnchor = require("markdown-it-anchor");
const options = {
  html: true,
  //breaks: true,
  //linkify: true,
  typographer: true,
};

module.exports = (eleventyConfig) => {
  // Add filters
  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("w3DateFilter", w3DateFilter);

  // Plugins
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  //Eleventy Image plugin
  eleventyConfig.addAsyncShortcode("image", async function (src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600],
      formats: ["jpg", "png"],
      outputDir: "./dist/images/content/img/",
      urlPath: "/images/content/img/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    // You bet we throw an error on a missing alt (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  });

  // ----Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy(".src/images/");

  // ------Markdown overrides----
  const markdownLib = markdownIt(options)
    .use(markdownItFootnote)
    .use(markdownitDeflist)
    .use(markdownItAnchor);

  eleventyConfig.setLibrary("md", markdownLib);

  // ===Collections=== //
  // . => blog posts  … … … … see [eleventy from scratch lesson](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/11/)
  // . . Returns a collection of blog posts in reverse date order
  eleventyConfig.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")]
      .filter((post) => !post.data.draft)
      .reverse();
  });

  // . => clippings
  // . . Returns clippings, sorted by rating
  eleventyConfig.addCollection("clippings", (collection) => {
    return sortByRatingOrder(
      collection.getFilteredByGlob("./src/clippings/*.md")
    );
  });
  // Returns clippings filtered by "featured: true"
  eleventyConfig.addCollection("featuredClippings", (collection) => {
    return sortByRatingOrder(
      collection.getFilteredByGlob("./src/clippings/*.md")
    ).filter((x) => x.data.featured);
  });
  eleventyConfig.addCollection("forms", (collection) => {
    return [...collection.getFilteredByGlob("./src/forms/*.md")];
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  // from [eleventy from scratch](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/19/)
  eleventyConfig.setUseGitIgnore(false);

  // see 11ty from scratch lesson 8 for [creating "featured" collections with this kind of filter](hhttps://piccalil.li/course/learn-eleventy-from-scratch/lesson/8/#heading-refactoring-our-collections)

  // Creating redirect string parsing see [Setting up page redirects with 11ty and Netlify](https://willvincent.com/2022/07/27/redirects-with-11ty-and-netlify/)

  eleventyConfig.addFilter("is_string", function (obj) {
    return typeof obj == "string";
  });

  return {
    markdownTemplateEngine: "njk", //using nunjucks as templating engine
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
