const { src, dest } = require("gulp");

// Configuration
const path = require("../config/path.js");
const plugins = require("../config/plugins.js");
const app = require("../config/app.js");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const size = require("gulp-size");
const uglify = require("gulp-uglify");
const gulpif = require("gulp-if");



// Java Script workflow
const js = () => {
    return src(plugins.js)
        .pipe(src(path.js.src))
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JS",
                message: error.message
            }))
        }))
        .pipe(concat('main.min.js'))
        .pipe(gulpif(app.isProd, size({title:"JS file before compression:"})))
        .pipe(gulpif(app.isProd, uglify()))
        .pipe(gulpif(app.isProd, size({title:"JS file after compression:"})))
        .pipe(dest(path.js.dest))      
}

module.exports = js;