'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSyncLib = require('browser-sync');
var pjson = require('./package.json');
var minimist = require('minimist');
var wrench = require('wrench');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
var plugins = gulpLoadPlugins();
// Create karma server
var KarmaServer = require('karma').Server;

var config = pjson.config;
var args = minimist(process.argv.slice(2));
var dirs = config.directories;
var taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
var browserSync = browserSyncLib.create();

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(gulp, plugins, args, config, taskTarget, browserSync);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('build', function(callback) {
  runSequence(['copy',
    'imagemin',
    'jade',
    'sass'],
    'inject-favicon-markups',
    'browserify',
    callback);
});

// Server tasks with watch
gulp.task('serve', [
  'imagemin',
  'copy',
  'jade',
  'sass',
  'inject-favicon-markups',
  'browserify',
  'browserSync',
  'watch'
]);

// Testing
gulp.task('test', ['eslint'], function(done) {
  new KarmaServer({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: !args.watch,
    autoWatch: args.watch
  }, done).start();
});

// Deploy to Github Pages
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});