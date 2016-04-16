class Initializer {
  constructor (elementId) {
    this.elementId = elementId;
  }

  init () {
    this.game = new Phaser.Game(
      /*width=*/320,
      /*height=*/200,
      /*renderer=*/Phaser.CANVAS,
      /*element_id=*/this.elementId,
      /*state=*/ null,
      /*transparent=*/false,
      /*anti_aliasing=*/false
    );
    this.game.state.add('Boot', new Boot(), /*autostart=*/true);
    this.game.state.add('Preload', new Preload());
    this.game.state.add('Intro', new Intro());
    this.game.state.add('LevelSelect', new LevelSelect());
    this.game.state.add('Play', new Play());
  }
}
