// see [learn eleventy from scratch article](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/19/)
import { dest, src } from "gulp";
import cleanCSS from "gulp-clean-css";
import gulpSass from "gulp-sass";
import * as sassCompiler from "sass";

const sass = gulpSass(sassCompiler);

// Flags whether we compress the output etc
const isProduction = process.env.NODE_ENV === "production";

// An array of outputs that should be sent over to includes
const criticalStyles = [
  "critical.scss",
  "sealfur.scss",
  "home.scss",
  "page.scss",
  "post.scss",
  "forms.scss",
  // 'work-item.scss',
];

// Takes the arguments passed by `dest` and determines where the output file goes
const calculateOutput = ({ history }) => {
  // By default, we want a CSS file in our dist directory, so the
  // HTML can grab it with a <link />
  let response = "./dist/css";

  // Get everything after the last slash
  const sourceFileName = /[^/]*$/.exec(history[0])[0];

  // If this is critical CSS though, we want it to go
  // to the _includes directory, so nunjucks can include it
  // directly in a <style>
  if (criticalStyles.includes(sourceFileName)) {
    response = "./src/_includes/css";
  }
  return response;
};

// The main Sass method grabs all root Sass files,
// processes them, then sends them to the output calculator
const styles = () => {
  return src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      cleanCSS(
        isProduction
          ? {
              level: 2,
            }
          : {}
      )
    )
    .pipe(dest(calculateOutput, { sourceMaps: !isProduction }));
};

export default styles;
