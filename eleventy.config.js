//=====This is the eleventy config file==========

// Eleventy (11ty) Plugins
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const fs = require("fs");

// Sass processing
const path = require("node:path");
const sass = require("sass");
// Critical styles that get inlined via {% include %} — mirrors your Gulp task
// const criticalStyles = [
//   "critical.scss",
//   "sealfur.scss",
//   "home.scss",
//   "page.scss",
//   "post.scss",
//   "forms.scss",
// ];

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

  //Sass and CSS config
  
  const criticalStyles = [
    "critical",
    "sealfur",
    "home",
    "post",
    "forms",
  ];
// ---> because the templates use the css in _includes, we need to build that directory
  eleventyConfig.on("eleventy.before", async () => {
  fs.mkdirSync("src/_includes/css", { recursive: true });
  
  criticalStyles.forEach((name) => {
    const result = sass.compile(`./src/scss/${name}.scss`, {
      loadPaths: ["src/scss"],
    });
    fs.writeFileSync(`./src/_includes/css/${name}.css`, result.css);
  });
});

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      this.addDependencies(inputPath, result.loadedUrls);

      return async (data) => {
        return result.css;
      };
    },
    compileOptions: {
      permalink: function (permalinkString, inputPath) {
        let parsed = path.parse(inputPath);
        return `css/${parsed.name}.css`;
      },
    },
  });
  eleventyConfig.addTemplateFormats("scss");

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
  eleventyConfig.addPassthroughCopy("src/images/");
  eleventyConfig.addPassthroughCopy("src/fonts");

  // ---- WatchIgnores changes to _includes/css to avoid a loop
  eleventyConfig.watchIgnores.add("src/_includes/css/**");

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
      collection.getFilteredByGlob("./src/clippings/*.md"),
    );
  });
  // Returns clippings filtered by "featured: true"
  eleventyConfig.addCollection("featuredClippings", (collection) => {
    return sortByRatingOrder(
      collection.getFilteredByGlob("./src/clippings/*.md"),
    ).filter((x) => x.data.featured);
  });
  eleventyConfig.addCollection("forms", (collection) => {
    return [...collection.getFilteredByGlob("./src/forms/*.md")];
  });

  // === TV Collections ===
  // Shows I'm actively watching right now
  eleventyConfig.addCollection("tvWatching", (collection) => {
    return collection.getFilteredByGlob("./src/tv/*.md")
      .filter(show => !show.data.draft && show.data.currentlyWatching)
      .sort((a, b) => (a.data.title || "").localeCompare(b.data.title || ""));
  });

  // Finished shows, sorted by rating descending
  eleventyConfig.addCollection("tv", (collection) => {
    return collection.getFilteredByGlob("./src/tv/*.md")
      .filter(show => !show.data.draft && !show.data.currentlyWatching)
      .sort((a, b) => b.data.rating - a.data.rating);
  });

  // All-time recommendations: published, flagged, sorted by rating descending
  eleventyConfig.addCollection("tvAllTime", (collection) => {
    return collection.getFilteredByGlob("./src/tv/*.md")
      .filter(show => !show.data.draft && show.data.allTimeRecommendation)
      .sort((a, b) => b.data.rating - a.data.rating);
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
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
