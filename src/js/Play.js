class Play {
  constructor(playerProgress) {
    this.playerProgress = playerProgress;
  }

  init(level) {
    this.level = level;
  }

  create () {
    this.createArrows();
  }

  createArrows() {
    this.arrows = {
      down : this.createArrow('down'),
      left : this.createArrow('left'),
      right: this.createArrow('right'),
      up   : this.createArrow('up')
    };
  }

  createArrow (direction) {
    var arrow = this.add.sprite(0, 0, 'arrow-' + direction);
    arrow.visible = false;
    return arrow;
  }

  update () {
    // Immediately win!
    this.playerProgress.levelBeaten(this.level);
    this.state.start('LevelSelect', /*clearWorld=*/true, /*clearCache=*/false);
  }
}
