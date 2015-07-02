'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('html', function () { 


  return gulp.src([
    path.join(conf.paths.src, '/**/*.html')
  ])
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/')));
});
