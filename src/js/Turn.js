class Turn extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5, 0.5);
  }

  turn(shape) {
    shape.velocity = {
      x: (this.direction === 'right' ? -1 : 1) * shape.velocity.y,
      y: (this.direction === 'right' ? 1 : -1) * shape.velocity.x
    };
  }
}
