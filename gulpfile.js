// Include gulp
var gulp = require('gulp');

// node file system
var fs = require('fs');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var clean = require('gulp-clean');
var include = require('gulp-include');


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/console.scss')
        .pipe(sass())
        .pipe(rename('console.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(minify())
        .pipe(rename('console.min.css'))
        .pipe(gulp.dest('./public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/console.js')
        .pipe(include())
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('console.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
   
});

// Clean build
gulp.task('clean', function() {
    gulp.src([
            'public'
        ])
        .pipe(clean({force: true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch']);