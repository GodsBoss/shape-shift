var del = require('del');
var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var exec = require('gulp-exec');
var sourcemaps = require('gulp-sourcemaps');

var DIST = process.cwd() + '/dist';
var SRC = 'src';

gulp.task(
  'default',
  ['build:index.html', 'build:phaser', 'build:game.js', 'build:style.css', 'build:gfx']
);

gulp.task(
  'build:index.html',
  function() {
    gulp.
      src(SRC + '/html/index.html').
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:phaser',
  function() {
    gulp.
      src('node_modules/phaser/build/phaser.*').
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:game.js',
  function() {
    var FILES = [
      // States
      'Boot',
      'Intro',
      'LevelSelect',
      'Play',
      'Preload',

      // Init
      'Initializer',
      'init'
    ].map(function(file) { return SRC + '/js/' + file + '.js'; });
    gulp.
      src(FILES).
      pipe(sourcemaps.init()).
      pipe(concat('game.js')).
      pipe(babel({presets: ['es2015']})).
      pipe(sourcemaps.write('.')).
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:style.css',
  function() {
    gulp.
      src(SRC + '/css/style.css').
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:gfx',
  function() {
    gulp.
      src(SRC + '/gfx/*.xcf').
      pipe(exec('node src/scripts/gfx.js <%= file.path %> ' + DIST + '/gfx')).
      pipe(exec.reporter());
  }
);

gulp.task(
  'clean',
  function() {
    return del(DIST);
  }
);
