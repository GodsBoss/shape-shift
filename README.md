Shape/Shift
===========

[![Inline docs](http://inch-ci.org/github/GodsBoss/shape-shift.svg?branch=master)](http://inch-ci.org/github/GodsBoss/shape-shift)
[![bitHound Code](https://www.bithound.io/github/GodsBoss/shape-shift/badges/code.svg)](https://www.bithound.io/github/GodsBoss/shape-shift)

About
-----

A game about shapes which shift... and also shapeshift. Command triangles,
squares, pentagons, hexagons around. They (you) solve puzzles.

Project for Ludum Dare 35, theme is "Shapeshift".

Build
-----

You need to have [Node.JS][node] with [npm][npm] installed. Also, you need
[GIMP][gimp]. Then:

```bash
  npm install
  npm run-script build
```

You'll find the game in the `dist` folder.

TODO
====

Game
----

- A *real* level editor. Preferably built in a similar way to the game, using
  the game's graphics and including a testing mode.
- Direct movement fields (down, left, right, up).
- Switches should affect traps. Trapped shapes must be preserved.
- Torus worlds: Levels should wrap around, so that left/right and/or up/down are
  connected.
- Diagonal mirrors.
- One-time variants of existing permanent fields, e.g. a turn field which is
  used up after a shape passes over it.
- Different level sizes (maybe with scrolling and/or scaling?).
- Timed and periodical switches. Instead of being triggered by clicks or a
  passing shape, they are activated/deactivated when a certain amount of time
  has passed.
- Switch interactions should be visible.

Tech
----

- For development: Some watching / serving, so the game can be run locally
  without hassle.
- Sprite atlas.
- Move all type-specific grid object logic out of the Play class.
- Generify effects and add more!
- Generify victory condition(s).

Thank you!
==========

I am standing on the shoulders of giants. This is a short (?) list of software,
libraries, etc., I used. Without them, this game would not have been possible.

Alphabetically ordered.

- [Atom][atom] as text editor / IDE
- [Babel][babel], because writing plain JavaScript sucks
- [Bfxr][bfxr] for sounds
- [Browserify][browserify] for handling inner JavaScript dependencies
- [Debian GNU/Linux][debian] as operating system
- [Mozilla Firefox][firefox] for testing purposes
- [GIMP][gimp] for graphics
- [Git][git] for version control
- [gulp.js][gulp] as build tool (including several plugins)
- [Node.js][node] is used by gulp
- [Phaser][phaser] (game framework)

[atom]: https://atom.io/
[babel]: https://babeljs.io/
[bfxr]: http://www.bfxr.net/
[browserify]: http://browserify.org/
[debian]: https://www.debian.org/
[firefox]: https://www.mozilla.org/firefox
[gimp]: http://www.gimp.org/
[git]: https://git-scm.com/
[gulp]: http://gulpjs.com/
[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[phaser]: http://phaser.io/
