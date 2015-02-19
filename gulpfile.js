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
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');

var NODE_ENV = process.env.NODE_ENV || process.argv[3];
var ENV = setupEnv(NODE_ENV);
var ENV_PROD = (ENV == 'production');

/* =========================================================================
 * Constants
 * ========================================================================= */
var BUILDDIR = 'dist';

var UNMINIFIED_LESS = 'tablestrap.css';
var MINIFIED_LESS = 'tablestrap.min.css';

var UNMINIFIED_SCRIPT = 'tablestrap.js';
var MINIFIED_SCRIPT = 'tablestrap.min.js';

//js
var UGLIFYOPTIONS = {
  //http://davidwalsh.name/compress-uglify
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  }
};

/* =========================================================================
 * Tasks
 * ========================================================================= */
gulp.task('clean', function(next) {
  return gulp.src(BUILDDIR, {
      read: false
    })
    .pipe(clean());
});

// Copy src folder to build directory
// gulp.task('copy', ['clean'], function(next) {
//   return gulp.src('src/**/*.*')
//     .pipe(gulp.dest(BUILDDIR));
// });

// Replace vars in config
// gulp.task('replace', ['copy'], function() {
//   return _replace(gulp.src([BUILDDIR + '/**/**/*', '! ' + BUILDDIR + '/bower_components/**/*.js']))
//     .pipe(gulp.dest(BUILDDIR));
// });

gulp.task('css', function() {
  gulp.src('src/less/tablestrap.less')
    .pipe(less({
      compress: false
    }))
    .pipe(rename(UNMINIFIED_LESS))
    .pipe(gulp.dest(BUILDDIR + '/css'));

  return gulp.src('src/less/tablestrap.less')
    .pipe(less({
      compress: true
    }))
    .pipe(rename(MINIFIED_LESS))
    .pipe(gulp.dest(BUILDDIR + '/css'));
});

gulp.task('less', function() {
  return gulp.src('src/less/**/**/*.less')
    .pipe(gulp.dest(BUILDDIR + '/less'));
});

/**
 * Minify javascript files
 */
gulp.task('js', function() {
  gulp.src('src/js/**/**/*.js')
    .pipe(gulp.dest(BUILDDIR + '/js'));

  return gulp.src('src/js/**/**/*.js')
    .pipe(concat(MINIFIED_SCRIPT))
    .pipe(uglify(MINIFIED_SCRIPT, UGLIFYOPTIONS))
    .pipe(gulp.dest(BUILDDIR + '/js'));
});

gulp.task('sampleapp-css', function() {
  return gulp.src('src/app/less/app.less')
    .pipe(less({
      compress: false
    }))
    .pipe(rename('tablestrapSampleApp.css'))
    .pipe(gulp.dest('src/app/css'));
});

gulp.task('server', ['less', 'css', 'sampleapp-css', 'js'], function() {

  console.log('watching less files');

  //tablestrap less files
  watch('src/**/*.less', {
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    //copy raw less files
    gulp.src('src/**/**/*.less')
      .pipe(rename(UNMINIFIED_LESS))
      .pipe(gulp.dest(BUILDDIR + '/less'));

    //copy to dist not minified
    gulp.src('src/less/tablestrap.less')
      .pipe(less({
        compress: false
      }))
      .pipe(rename(UNMINIFIED_LESS))
      .pipe(gulp.dest(BUILDDIR + '/css'));

    //copy to dist minified
    gulp.src('src/less/tablestrap.less')
      .pipe(less({
        compress: true
      }))
      .pipe(rename(MINIFIED_LESS))
      .pipe(gulp.dest(BUILDDIR + '/css'));

    //recompile the sample app
    return gulp.src('src/app/less/app.less')
      .pipe(less({
        compress: false
      }))
      .pipe(rename('tablestrapSampleApp.css'))
      .pipe(gulp.dest('src/app/css'));
  });

  //tablestrap sample app less files
  watch('src/app/less/app.less', {
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    return gulp.src('src/app/less/app.less')
      .pipe(less({
        compress: false
      }))
      .pipe(rename('tablestrapSampleApp.css'))
      .pipe(gulp.dest('src/app/css'));
  });

  //tablestrap js files
  watch('src/**/*.js', {
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    gulp.src('src/js/**/**/*.js')
      .pipe(gulp.dest(BUILDDIR + '/js'));

    return gulp.src('src/js/**/**/*.js')
      .pipe(concat(MINIFIED_SCRIPT))
      .pipe(uglify(MINIFIED_SCRIPT, UGLIFYOPTIONS))
      .pipe(gulp.dest(BUILDDIR + '/js'));
  });

  return require(__dirname + '/server');
});

gulp.task('default', ['clean', 'server']);

/* =========================================================================
 * Private Helpers
 * ========================================================================= */
function _init(stream) {
  stream.setMaxListeners(0);
  return stream;
}

// function _replace(stream) {
//   _init(stream);
//   for (key in appConfig) {
//     stream.pipe(replace('@@' + key, appConfig[key], {
//       skipBinary: true
//     }));
//   }

//   _htmlReplace(stream);

//   return stream;
// }

// function _htmlReplace(stream) {

//   if (ENV === 'production') {
//     stream.pipe(gulpIf(_isHtmlFile, htmlReplace({
//       devscripts: '<script src="/app/' + MINIFIEDSCRIPT + '"></script>'
//     })));
//   }

//   return stream;
// }

// function _isJsFile(file) {
//   return _endsWith(file.path, '.js');
// }

// function _isHtmlFile(file) {
//   return _endsWith(file.path, '.html');
// }

// function _endsWith(s, suffix) {
//   return s.indexOf(suffix, s.length - suffix.length) !== -1;
// }

function setupEnv(env) {
  // allow passing name as an argument
  if (env && env.indexOf('-') === 0) env = env.substring(1);

  // production
  if (env === 'master' || env === 'prod' || env === 'production') return 'production';
  // development
  else if (env === 'dev' || env === 'development') return 'development';
  // local
  else if (env === 'local') return 'local';
  // default
  else return 'development';
}
