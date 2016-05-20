var cp = require('child_process');
var del = require('del');
var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var exec = require('gulp-exec');
var sourcemaps = require('gulp-sourcemaps');

var DIST = process.cwd() + '/dist';
var SRC = 'src';

gulp.task(
  'default',
  ['build:index.html', 'build:phaser', 'build:game.js', 'build:style.css', 'build:gfx', 'build:levels', 'build:sfx']
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
    var excludes = [
      'arcade',
      'bitmaptext',
      'color',
      'creature',
      'debug',
      'flexgrid',
      'intro',
      'gamepad',
      'net',
      'ninja',
      'outro',
      'p2',
      'particles',
      'physics',
      'rendertexture',
      'retrofont',
      'rope',
      'text',
      'tilemaps',
      'tilesprite',
      'tweens',
      'video'
    ].join(',');
    var proc = cp.exec(
      [
        'cd node_modules/phaser',
        'npm install --only:dev --progress=false',
        'grunt custom --filename phaser --sourcemap true --uglify true --exclude ' + excludes,
        'cp dist/phaser.min.js dist/phaser.map ../../dist'
      ].join(' && ')
    );
    var log = console.log.bind(console);
    proc.stdout.on('data', log);
    proc.stderr.on('data', log);
  }
);

gulp.task(
  'build:game.js',
  function() {
    gulp.
      src(SRC + '/js/*.js').
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
  'build:levels',
  function() {
    cp.exec(
      'node src/scripts/join_levels.js ' + process.cwd() + '/' + SRC + '/levels ' + DIST + '/levels.json',
      function(error, stdout, stderr) {
        if (error) {
          throw error;
        }
        console.log(stdout);
      }
    );
  }
);

gulp.task(
  'build:sfx',
  function() {
    gulp.
      src(SRC + '/sfx/*.wav').
      pipe(gulp.dest(DIST + '/sfx'));
  }
);

gulp.task(
  'clean',
  function() {
    return del(DIST);
  }
);

gulp.task(
  'lint',
  function() {
    return gulp.
      src(SRC + '/js/*.js').
      pipe(eslint()).
      pipe(eslint.format()).
      pipe(eslint.failAfterError());
  }
);
