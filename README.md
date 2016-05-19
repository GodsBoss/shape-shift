Shape/Shift
===========

About
-----

A game about shapes which shift... and also shapeshift. Command triangles,
squares, pentagons, hexagons around. They (you) solve puzzles.

Project for Ludum Dare 35, theme is "Shapeshift".

Build
-----

You need to have [https://nodejs.org/](Node.js) with
[https://www.npmjs.com/](npm) installed. Also, you need
[http://www.gimp.org/](GIMP). Then:

  npm install
  npm run-script build

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

- Sprite atlas.
- Much of the logic in the 'Play' state looks suspiciously generic and can very
  likely be extracted into methods and/or classes. Especially true for the
  different in-game objects (not buttons or arrows).

Thank you!
==========

I am standing on the shoulders of giants. This is a short (?) list of software,
libraries, etc., I used. Without them, this game would not have been possible.

Alphabetically ordered.

- [https://atom.io/](Atom) as text editor / IDE
- [https://babeljs.io/](Babel), because writing plain JavaScript sucks
- [http://www.bfxr.net/](Bfxr) for sounds
- [https://www.debian.org/](Debian) as operating system
- [https://www.mozilla.org/firefox](Firefox) for testing purposes
- [http://www.gimp.org/](GIMP) for graphics
- [https://git-scm.com/](Git) for version control
- [http://gulpjs.com/](gulp.js) as build tool (including several plugins)
- [https://nodejs.org/](Node.js) is used by gulp
- [http://phaser.io/](Phaser) (game framework)
