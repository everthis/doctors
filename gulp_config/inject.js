'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', function () {

  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/styles/**/*.css')
  ], { read: false }, {relative: true});

  var injectStylesOptions = {
    addRootSlash: false,
    starttag: '<!-- inject:css -->',
    ignorePath: '.tmp/'
    // transform: function (filePath, file) {
    //   // return file contents as string 
    //   // return file.contents.toString('utf8')
    //   console.log(filePath.slice(5));
    //   console.log(file);
    //   return filePath.slice(5);
    // }
  };


  return gulp.src(path.join(conf.paths.tmp, '/**/*.html'))
    .pipe($.inject(injectStyles, injectStylesOptions))
    .pipe(gulp.dest(conf.paths.tmp));
});
