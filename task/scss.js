const { src, dest } = require("gulp");

// Configuration
const path = require("../config/path.js");
const plugins = require("../config/plugins.js");
const app = require("../config/app.js")

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));
const webpCss = require("gulp-webp-css-fixed");
const gulpif = require("gulp-if");

// SCSS workflow
const scss = () => {
    return src(plugins.css, {sourcemaps: app.isDev})
        .pipe(src(path.scss.src, {sourcemaps: app.isDev}))
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "SCSS",
                message: error.message
            }))
        }))
        .pipe(concat('main.css'))
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer(app.autoprefixer))
        .pipe(shorthand())
        .pipe(groupCssMediaQueries())
        .pipe(gulpif(app.isProd, size({title:"main.css size:"})))
        .pipe(gulpif(app.isProd, dest(path.scss.dest)))
        .pipe(rename({ suffix: ".min"}))
        .pipe(gulpif(app.isProd, csso()))
        .pipe(gulpif(app.isProd, size({title:"main.min.css size:"})))
        .pipe(dest(path.scss.dest, {sourcemaps: app.isDev}))      
}

module.exports = scss;