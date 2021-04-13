const {
    src,
    dest,
    series,
    watch
} = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
// const uglify = require('gulp-uglify-es').default;
const minify = require('gulp-minify');
// const concat = require('gulp-concat');
const sync = require('browser-sync').create();

function clear() {
    return del('dist')
}

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(htmlmin({
            // collapseWhitespace: true
        // }))/
        .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(concat('style.css'))
        // .pipe(gcmq())
        .pipe(dest('dist/css'))
        .pipe(csso())
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css'))
}
function imgmin() {
    return src('src/img/**/*.+(png|jpg|gif|svg|mp4)')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 7}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/img'))
}

function jsmin() {
    return src('src/js/**/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['assets'],
        ignoreFiles: ['*.min.js']
    }))
    .pipe(dest('dist/js'))
}

function fonts() {
    return src('src/fonts/*.*')
    .pipe(dest('dist/fonts'))
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/img/**/*.+(png|jpg|gif|svg)', series(imgmin)).on('change', sync.reload)
    watch('src/scss/**/*.scss', series(scss)).on('change', sync.reload)
    watch('src/js/**/*.js', series(jsmin)).on('change', sync.reload)
}

exports.build = series(clear, fonts, scss, html, imgmin, jsmin)
exports.serve = series(clear, fonts, scss, html, imgmin, jsmin, serve)
exports.clear = clear;
