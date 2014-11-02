/* ========================================================================
 * Dependencies
 * ========================================================================= */
var fs = require('fs')
var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var rename = require('gulp-rename');

/* =========================================================================
 * Constants
 * ========================================================================= */
var BUILDDIR = 'dist';

var UNMINIFIED_LESS = 'tablestrap.css';
var MINIFIED_LESS = 'tablestrap.min.css';

/* =========================================================================
 * Tasks
 * ========================================================================= */

gulp.task('clean', function(next) {
  return gulp.src(BUILDDIR, {
      read: false
    })
    .pipe(clean());
});

gulp.task('css', function() {
  gulp.src('src/less/tablestrap.less')
    .pipe(less({
      compress: false
    }))
    .pipe(rename(UNMINIFIED_LESS))
    .pipe(gulp.dest(BUILDDIR));

  return gulp.src('src/less/tablestrap.less')
    .pipe(less({
      compress: true
    }))
    .pipe(rename(MINIFIED_LESS))
    .pipe(gulp.dest(BUILDDIR));
});


gulp.task('sampleapp-css', function() {
  return gulp.src('src/app/less/app.less')
    .pipe(less({
      compress: false
    }))
    .pipe(rename('tablestrapSampleApp.css'))
    .pipe(gulp.dest('src/app/css'));
});

gulp.task('server', ['css', 'sampleapp-css'], function() {

  console.log('watching less files');

  //tablestrap less files
  watch('src/**/*.less', {
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    gulp.src('src/less/tablestrap.less')
      .pipe(less({
        compress: false
      }))
      .pipe(rename(UNMINIFIED_LESS))
      .pipe(gulp.dest(BUILDDIR));

    gulp.src('src/less/tablestrap.less')
      .pipe(less({
        compress: true
      }))
      .pipe(rename(MINIFIED_LESS))
      .pipe(gulp.dest(BUILDDIR));
  });

  //tablestrap sample app less files
  watch('src/app/less/app.less', {
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    gulp.src('src/app/less/app.less')
      .pipe(less({
        compress: false
      }))
      .pipe(rename('tablestrapSampleApp.css'))
      .pipe(gulp.dest('src/app/css'))
  });

  return require(__dirname + '/server');
});

gulp.task('default', ['clean', 'server']);
