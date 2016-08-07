/*global require*/
"use strict";

var gulp = require('gulp'),
	path = require('path'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync');

var settings = {
  baseDir: './',
	sassDir: 'sass',
	cssDir: 'dist/css',
  jsDir: 'js',
  jsOutDir: 'dist/js'
};

gulp.task('browser-sync', ['sass'], function () {
	browserSync({
    server: {
      baseDir: settings.baseDir
    },
		notify: false
	});
});

gulp.task('sass', function () {
	return gulp.src(settings.sassDir + '/main.sass')
    .pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [settings.sassDir]
		}))
		.on('error', sass.logError)
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(sourcemaps.write())
		.pipe(gulp.dest(settings.cssDir))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
  return gulp.src(settings.jsDir + '/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(settings.jsOutDir))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
	gulp.watch(settings.sassDir + '/**', ['sass']);
  gulp.watch(settings.jsDir + '/**', ['js']);
  gulp.watch(settings.baseDir + '*.html', ['html']);
});

gulp.task('default', ['browser-sync', 'watch']);
