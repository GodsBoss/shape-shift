class Turn extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5, 0.5);
    this.rotation = Math.random() * Math.PI * 2;
  }

  turn(shape) {
    shape.velocity = {
      x: (this.direction === 'right' ? -1 : 1) * shape.velocity.y,
      y: (this.direction === 'right' ? 1 : -1) * shape.velocity.x
    };
    shape.addRotation((this.direction === 'right' ? 1 : -1) * Math.random() * 0.1);
    this.playState.sound.play(this.direction);
  }

  update() {
    super.update();
    this.rotation += (this.direction === 'right' ? 1 : -1) * Turn.rotationSpeed;
  }
}

Turn.rotationSpeed = 0.02;
