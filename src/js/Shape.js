class Shape extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.velocity = null;
    this.speed = 1;
  }

  currentlyMoving() {
    return this.velocity !== null;
  }

  initiateMove(direction) {
    this.velocity = { x: direction.vx, y: direction.vy };
  }

  stop() {
    this.velocity = null;
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
    if (this.currentlyMoving()) {
      this.position.setTo(this.position.x + this.velocity.x * this.speed, this.position.y + this.velocity.y * this.speed);
    }
  }
}
