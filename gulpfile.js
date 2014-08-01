// Generated by CoffeeScript 1.6.3
var $, gulp, path;

gulp = require('gulp');

path = require('path');

$ = require('gulp-load-plugins')();

gulp.task('clean', function() {
  return gulp.src('./dist', {
    read: false
  }).pipe($.rimraf({
    force: true
  }));
});

gulp.task('js', function() {
  return gulp.src('./scripts/wechatApi.coffee').pipe($.coffee({
    bare: true
  })).pipe(gulp.dest('./dist')).pipe($.uglify()).pipe($.rename({
    extname: '.min.js'
  })).pipe(gulp.dest('./dist'));
});

gulp.task('default', ['clean', 'js']);