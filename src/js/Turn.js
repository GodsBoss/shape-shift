import PhaserConstants from './PhaserConstants';

export default class Turn extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(PhaserConstants.ANCHOR_CENTER, PhaserConstants.ANCHOR_CENTER);
    this.rotation = Math.random() * Math.PI * 2;
  }

  turn(shape) {
    shape.velocity = {
      x: (this.direction === 'right' ? Turn.NEGATIVE : Turn.POSITIVE) * shape.velocity.y,
      y: (this.direction === 'right' ? Turn.POSITIVE : Turn.NEGATIVE) * shape.velocity.x
    };
    shape.addRotation((this.direction === 'right' ? Turn.POSITIVE : Turn.NEGATIVE) * Math.random() * Turn.SHAPE_ROTATION_FACTOR);
    this.playState.sound.play(this.direction);
  }

  update() {
    super.update();
    this.rotation += (this.direction === 'right' ? Turn.POSITIVE : Turn.NEGATIVE) * Turn.ROTATION_SPEED;
  }
}

Turn.ROTATION_SPEED = 0.02;
Turn.SHAPE_ROTATION_FACTOR = 0.1;
Turn.POSITIVE = 1;
Turn.NEGATIVE = -1;
