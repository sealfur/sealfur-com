const Parser = require("rss-parser");
const parser = new Parser();

let rss_feed = "https://heydonworks.com/feed.xml";

module.exports = async function () {
  return await parser.parseURL(rss_feed);
};
