var gulp = require('gulp');

gulp.task(
  'default',
  ['build:index.html', 'build:phaser']
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
