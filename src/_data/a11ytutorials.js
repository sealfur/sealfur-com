const Parser = require('rss-parser');
const parser = new Parser();

let rss_feed = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCuTSmoEPPoRsT7H0TtfP3Ig';

module.exports = async function () {
  return await parser.parseURL(rss_feed);
}