// see [eleventy from scratch lesson about pulling fonts in](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/20/)
const { dest, src } = require('gulp');
const GetGoogleFonts = require('get-google-fonts');

const fonts = async () => {
  // Setup of the library instance by setting where we want
  // the output to go. CSS is relative to output font directory
  const instance = new GetGoogleFonts({
    outputDir: './dist/fonts',
    cssFile: './fonts.css',
  });

  // Grabs fonts and CSS from google and puts in the dist folder
  const result = await instance.download(
    'https://fonts.googleapis.com/css2?family=Inter:wght@200..700&family=Sansita+Swashed:wght@300..900'
  );

  return result;
};

module.exports = fonts;
