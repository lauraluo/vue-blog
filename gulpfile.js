var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require("gulp.spritesmith"),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    gulpkss = require('gulp-kss'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    open = require('gulp-open');
    vueify = require('gulp-vueify');
// bowerFiles = require('bower-files');
var vueify = require('vueify');
// var $ = require('gulp-load-plugins')();
var browserify = require('gulp-browserify');
// // Sass
gulp.task('sass', function() {
    gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['src/scss/**/**']
        }))
        .pipe(autoprefixer({
            browsers: ["last 4 versions", "Firefox >= 27", "Blackberry >= 7", "IE 8", "IE 9"],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());

});

// CSS Sprite
gulp.task('sprite', function() {
    var spriteData = gulp.src('src/sprite/*.png')
        .pipe(plumber())
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: '../images/sprite.png'
        }));
    spriteData.img.pipe(gulp.dest('dist/images'));
    spriteData.css.pipe(gulp.dest('dist/css/'));
});


//vue
gulp.task("vueify", function() {
    return gulp
        .src('src/main.js')
        .pipe(browserify({
            transform: 'vueify',
            insertGlobals : true,
            debug : true
        }))
        .on('error', function(err) {
            // print the error (can replace with gulp-util)
            console.log(err.message);
            // end this stream
            this.emit('end');
        })
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

// Jade
gulp.task('jade', function() {
    gulp.src(['src/*.jade', '!src/_*.jade'])
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
    gulp.src('dist/*.html')
        .pipe(connect.reload());
});

//Sever
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist',
        port: 3001,
        livereload: true
    });
});

//Copy
gulp.task('copyJS', function() {
    gulp.src(['src/js/**'])
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('copyImg', function() {
    gulp.src(['src/images/**'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copyAssets', function() {
    gulp.src(['src/assets/**'])
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('copyAll', ['copyJS', 'copyImg', 'copyAssets'], function() {});

//Clean
gulp.task('reset', function() {
    gulp.src(['dist/'])
        .pipe(clean());
});


//Open
gulp.task('open', function() {
    gulp.src(__filename)
        .pipe(open({
            uri: 'http://localhost:3001',
            app: 'firefox'
        }));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(['src/*.jade'], ['jade']);
    gulp.watch('src/scss/**/**.scss', ['sass']);
    gulp.watch(['src/js/**'], ['copyJS']);
    gulp.watch(['src/images/**'], ['copyImg']);
    gulp.watch(['dist/*.html'], ['html']);
    gulp.watch(['src/components/**/*.vue','src/main.js'], ['vueify']);
});

//Build
gulp.task('build', ['jade', 'sass', 'copyAll','vueify'], function() {});

//Group Dev
gulp.task('dev', ['build', 'connectDist', 'watch', 'open'], function() {});

// Default  Task
gulp.task('default', ['dev'], function() {});
