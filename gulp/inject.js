'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles'], function () {

  var injectHTMLs = gulp.src([
        path.join(conf.paths.src, 'components/header.html')
    ], {read: true});

  var injectHTMLsOptions = {
    addRootSlash: false,
    starttag: '<!-- inject:header:html -->',
    transform: function (filePath, file) {
      // return file contents as string 
      return file.contents.toString('utf8')
    }
  };

  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/styles/**/*.css'),
    path.join('!' + conf.paths.tmp, '/styles/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/scripts/**/*.module.js'),
    path.join(conf.paths.src, '/scripts/**/*.js'),
    path.join('!' + conf.paths.src, '/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/**/*.mock.js')
  ]);
  // .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectCommonScripts = gulp.src([
      path.join(conf.paths.src, '/scripts/require.js'),
      path.join(conf.paths.src, '/scripts/flexible.js'),
      path.join(conf.paths.src, '/scripts/makegrid.js')
    ]);
  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectHTMLs, injectHTMLsOptions))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectCommonScripts, injectOptions))
    // .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '')));
});
