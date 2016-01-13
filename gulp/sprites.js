'use strict';

var path = require('path');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var print = require('gulp-print');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var entries = config.entries;
  var dest = dirs.sprites.replace(/^_/, '');

  // generate sprite.png and _sprite.scss 
  gulp.task('sprites', function () {
    return sprity.src({
      src: path.join(dirs.source, dirs.sprites, entries.sprites),
      style: '_sprites.scss',
      prefix: 'sprite',
      cssPath: '../images/sprites'
      // processor isn't too useful right now if it doesn't automatically generate classes. just output CSS for now
      // , processor: 'sass'
    })
    .pipe(print())
    .pipe(gulpif('*.png', gulp.dest(path.join(dirs.source, dirs.images, dest)), gulp.dest(path.join(dirs.source, dirs.styles))))
  });
};
