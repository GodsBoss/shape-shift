var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task(
  'default',
  ['build:index.html', 'build:phaser', 'build:game.js']
);

gulp.task(
  'build:index.html',
  function() {
    gulp.
      src('src/html/index.html').
      pipe(gulp.dest('dist'));
  }
);

gulp.task(
  'build:phaser',
  function() {
    gulp.
      src('node_modules/phaser/build/phaser.*').
      pipe(gulp.dest('dist'));
  }
);

gulp.task(
  'build:game.js',
  function() {
    gulp.
      src('src/js/init.js').
      pipe(concat('game.js')).
      pipe(gulp.dest('dist'));
  }
);
