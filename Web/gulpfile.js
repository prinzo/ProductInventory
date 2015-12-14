// gulpfile.js
var gulp = require('gulp'); //build tools dependencies
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var del = require('del');
var path = require('path');
var less = require('gulp-less');
var inject = require('gulp-inject');

gulp.task('clean', function (callback) {
  del(['build/*'], callback);
});

gulp.task('build:js', function () {
  return gulp.src([
    'app/**/*.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('build/'))
  .on('error', gutil.log);
});

gulp.task('build:css', function () {
  var opts = {
    paths: [path.join(__dirname, 'less', 'includes')]
  };
  return gulp.src('app/**/*.less')
  .pipe(less(opts))
  .pipe(concat('app.css'))
  .pipe(gulp.dest('build/'))
  .on('error', gutil.log);
});

gulp.task('build:index', ['build:js', 'build:css'], function () {
  var target = gulp.src('index.html');
  
  var sources = gulp.src([
    'build/**/*.js',
    'build/**/*.css'
  ])
  .on('error', gutil.log);
  
  var opts = {
    ignorePath: 'build',
    addRootSlash: false
  };
  return target
  .pipe(inject(sources, opts))
  .pipe(gulp.dest('build'))
  .on('error', gutil.log);
});

gulp.task('build',  function () {
  return gulp.start(['build:index']);
});

gulp.task('default', ['build']);