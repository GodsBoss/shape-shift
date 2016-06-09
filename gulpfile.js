var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var cp = require('child_process');
var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var exec = require('gulp-exec');
var source = require('vinyl-source-stream');
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
    return gulp.
      src(SRC + '/html/index.html').
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:phaser',
  function(callback) {
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
    var cmd = [
      'cd node_modules/phaser',
      'npm install --only:dev --progress=false',
      'npm install grunt-cli',
      './node_modules/.bin/grunt custom --filename phaser --sourcemap true --uglify true --exclude ' + excludes,
      'cp dist/phaser.min.js dist/phaser.map ../../dist',
    ].join(' && ')
    runCommandAsynchronously(cmd, 'Phaser creation', callback);
  }
);

gulp.task(
  'build:game.js',
  function() {
    var b = browserify(
      {
        entries: './src/js/init.js',
        transform: [
          [
            "babelify",
            {
              presets: ["es2015"]
            }
          ]
        ]
      }
    );
    return b.
      bundle().
      pipe(source('game.js')).
      pipe(buffer()).
      pipe(sourcemaps.init()).
      pipe(sourcemaps.write('.')).
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:style.css',
  function() {
    return gulp.
      src(SRC + '/css/style.css').
      pipe(gulp.dest(DIST));
  }
);

gulp.task(
  'build:gfx',
  function() {
    return gulp.
      src(SRC + '/gfx/*.xcf').
      pipe(exec('node src/scripts/gfx.js <%= file.path %> ' + DIST + '/gfx')).
      pipe(exec.reporter());
  }
);

gulp.task(
  'build:levels',
  function(callback) {
    runCommandAsynchronously(
      'node src/scripts/join_levels.js ' + process.cwd() + '/' + SRC + '/levels ' + DIST + '/levels.json',
      'Level creation',
      callback
    );
  }
);

gulp.task(
  'build:sfx',
  function() {
    return gulp.
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

function runCommandAsynchronously(cmd, name, gulpCallback) {
  proc = cp.exec(cmd);
  var log = console.log.bind(console);
  proc.stdout.on('data', log);
  proc.stderr.on('data', log);
  proc.on(
    'exit',
    function(code, signal) {
      var error;
      if (code > 0) {
        error = new Error(name + ' exited with code ' + code + ', ' + (signal ? 'termination signal was ' + signal : 'no signal') + '.');
      }
      gulpCallback(error);
    }
  );
}
