var gulp = require('gulp');

gulp.task(
  'default',
  function() {}
);

gulp.task(
  'build:index.html',
  function() {
    gulp.
      src('src/html/index.html').
      pipe(gulp.dest('dist'));
  }
);
