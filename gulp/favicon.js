'use strict';

var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

var path = require('path');
var print = require('gulp-print');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var dest = path.join(dirs.source, dirs.favicons);

  // File where the favicon markups are stored
  var FAVICON_DATA_FILE = 'faviconData.json';

  // Generate the icons. This task takes a few seconds to complete. 
  // You should run it at least once to create the icons. Then, 
  // you should run it whenever RealFaviconGenerator updates its 
  // package (see the check-for-favicon-update task below).
  gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
      masterPicture: path.join(dirs.source, '_images/graphics/t-bone.svg'),
      dest: dest,
      iconsPath: path.join('/', dirs.favicons),
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#29b6f6',
          margin: '21%'
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#da532c',
          onConflict: 'override'
        },
        androidChrome: {
          pictureAspect: 'backgroundAndMargin',
          margin: '21%',
          backgroundColor: '#29b6f6',
          themeColor: '#29b6f6',
          manifest: {
            name: 'Chris Zamierowski',
            display: 'browser',
            orientation: 'notSet',
            onConflict: 'override'
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 75,
          themeColor: '#5bbad5'
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false
      },
      versioning: {
        paramName: 'v',
        paramValue: 'vMMqAM29Wa'
      },
      markupFile: FAVICON_DATA_FILE
    }, function() {
      done();
    });
  });

  // Inject the favicon markups in your HTML pages. You should run 
  // this task whenever you modify a page. You can keep this task 
  // as is or refactor your existing HTML pipeline.
  gulp.task('inject-favicon-markups', function() {
    gulp.src([ path.join(taskTarget, '**/*.html') ])
      .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
      .pipe(gulp.dest(path.join(taskTarget)));
  });

  // Check for updates on RealFaviconGenerator (think: Apple has just
  // released a new Touch icon along with the latest version of iOS).
  // Run this task from time to time. Ideally, make it part of your 
  // continuous integration system.
  gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
      if (err) {
        throw err;
      }
    });
  });
};