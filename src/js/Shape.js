export default class Shape extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.velocity = null;
    this.speed = 1;
    this.rotationSpeed = 0;
  }

  currentlyMoving() {
    return this.velocity !== null;
  }

  initiateMove(direction) {
    this.velocity = { x: direction.vx, y: direction.vy };
  }

  stop() {
    this.velocity = null;
    this.rotationSpeed = 0;
  }

  addRotation(rotation) {
    this.rotationSpeed = Math.min(Shape.MAX_ROTATION_SPEED, Math.max(-Shape.MAX_ROTATION_SPEED, this.rotationSpeed + rotation));
  }

  hasGridPositionChanged(newGridX, newGridY) {
    return Math.abs(newGridX - this.gridX) >= 1 || Math.abs(newGridY - this.gridY) >= 1;
  }

  setGridPosition(newGridX, newGridY) {
    this.gridX = newGridX;
    this.gridY = newGridY;
  }

  update() {
    super.update();
    this.rotation += this.rotationSpeed;
    if (this.currentlyMoving()) {
      this.position.setTo(this.position.x + this.velocity.x * this.speed, this.position.y + this.velocity.y * this.speed);
    }
  }
}

Shape.MAX_ROTATION_SPEED = 0.05;
