const { src, dest } = require("gulp");

// Configuration
const path = require("../config/path.js");
const plugins = require("../config/plugins.js");
const app = require("../config/app.js")

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css-fixed");
const gulpif = require("gulp-if");

// CSS workflow
const css = () => {
    return src(plugins.css, {sourcemaps: app.isDev})
        .pipe(src(path.css.src, {sourcemaps: app.isDev}))
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "CSS",
                message: error.message
            }))
        }))
        .pipe(concat('main.css'))
        .pipe(cssimport())
        .pipe(webpCss())
        .pipe(autoprefixer(app.autoprefixer))
        .pipe(shorthand())
        .pipe(groupCssMediaQueries())
        .pipe(gulpif(app.isProd, size({title:"main.css size:"})))
        .pipe(gulpif(app.isProd, dest(path.css.dest)))
        .pipe(rename({ suffix: ".min"}))
        .pipe(gulpif(app.isProd, csso()))
        .pipe(gulpif(app.isProd, size({title:"main.min.css size:"})))
        .pipe(dest(path.css.dest, {sourcemaps: app.isDev}))      
}

module.exports = css;