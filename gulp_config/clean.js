'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('clean', function (done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('clean_styles', function (done) {
  $.del([path.join(conf.paths.dist, '/styles'), path.join(conf.paths.tmp, '/styles')], done);
});

gulp.task('clean_scripts', function (done) {
  $.del([path.join(conf.paths.dist, '/scripts'), path.join(conf.paths.tmp, '/scripts')], done);
});