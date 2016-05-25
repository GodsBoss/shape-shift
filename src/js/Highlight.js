import PhaserConstants from './PhaserConstants';

export default class Highlight extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(PhaserConstants.ANCHOR_CENTER, PhaserConstants.ANCHOR_CENTER);
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = 0.2;
    this.rotationSpeedFactor = 0.95;
    this.scale = { x: 2, y: 2 };
    this.scaleFactor = 0.98;
  }

  canBeRemoved() {
    return this.scale.x < 0.5;
  }

  update() {
    this.rotationSpeed *= this.rotationSpeedFactor;
    this.rotation += this.rotationSpeed;
    this.scale.x *= this.scaleFactor;
    this.scale.y *= this.scaleFactor;
  }
}
