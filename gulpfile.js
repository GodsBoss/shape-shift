var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var DIST = 'dist';

gulp.task(
  'default',
  ['build:index.html', 'build:phaser', 'build:game.js', 'build:style.css']
);

gulp.task(
  'build:index.html',
  function() {
    gulp.
      src('src/html/index.html').
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
      'Initializer',
      'init'
    ].map(function(file) { return 'src/js/' + file + '.js'; });
    gulp.
      src(FILES).
      pipe(concat('game.js')).
      pipe(babel({presets: ['es2015']})).
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:style.css',
  function() {
    gulp.
      src('src/css/style.css').
      pipe(gulp.dest(DIST));
  }
);
