const { parallel, watch } = require('gulp');
// const gulp = require('gulp');
// Pull in each task
const fonts = require('./gulp-tasks/fonts.js');
const images = require('./gulp-tasks/images.js');
const css = require('./gulp-tasks/sass.js');

// function buildStyles() {
//   return gulp.src('./scss/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// };

// Set each directory and contents that we want to watch and
// assign the relevant task. `ignoreInitial` set to true will
// prevent the task being run when we run `gulp watch`, but it
// will run when a file changes.
const watcher = function () {
  watch('./src/images/**/*', {ignoreInitial: true}, images);
  watch('./src/scss/**/*.scss', { ignoreInitial: true }, css);
};

// The default (if someone just runs `gulp`) is to run each task in parrallel
exports.default = parallel(fonts, images, css);

// This is our watcher task that instructs gulp to watch directories and
// act accordingly
exports.watch = watcher;
