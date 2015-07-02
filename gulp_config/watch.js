'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');

// ['add', 'change', 'unlink']
function isOnlyChange(event) {
  return event.type === 'changed';
}

// gulp.task('watch', ['inject'], function () {
gulp.task('watch', function () {

  gulp.watch([path.join(conf.paths.src, '/**/*.html'), 'bower.json'], function(event) {

    return gulp.src(path.join(conf.paths.src, '/**/*.html'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/')))
      .pipe(browserSync.reload({ stream: true }))
      .pipe($.size());

    // console.log(event.path, event.type);
    // .pipe(gulp.dest(path.join(conf.paths.tmp, '/')))
    // browserSync.reload(event.path);
  });

  gulp.watch([path.join(conf.paths.src, '/styles/**/*.scss')], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
      gulp.start('inject');
      console.log('css');
    } else {
      gulp.start('inject');
      console.log('inject');
    }
  });

  // gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
  //   if(isOnlyChange(event)) {
  //     gulp.start('scripts');
  //     console.log('scripts');
  //   } else {
  //     gulp.start('inject');
  //     console.log('inject');
  //   }
  // });

  // gulp.watch(path.join(conf.paths.tmp, '/**/*.html'), );
});
