class Teleporter extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.target = null;
    this.animations.add('...', null, /*fps=*/8, /*loop=*/true).play();
  }

  teleport(shape) {
    if (this.target) {
      shape.gridX = this.target.x;
      shape.gridY = this.target.y;
      shape.position.setTo(this.playState.calcX(shape.gridX), this.playState.calcY(shape.gridY));
    }
  }
}
