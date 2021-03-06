'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {


  var compassOptions = {
    // config_file: './config.rb',
    css: conf.paths.tmp + '/styles',
    sass: conf.paths.src + '/styles',
    image: conf.paths.src + '/images',
    generated_images_path: conf.paths.tmp + '/images',
    sourcemap: true,
    logging: false
    // debug: true
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/styles/**/*.scss')
    // path.join('!' + conf.paths.src, '/styles/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  return gulp.src([
    path.join(conf.paths.src, '/styles/**/*.scss')
  ])
    .pipe($.compass(compassOptions)).on('error', conf.errorHandler('Compass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/styles/')))
    .pipe(browserSync.reload({ stream: true }));
});
