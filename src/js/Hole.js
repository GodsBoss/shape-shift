class Hole extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  accept(shape) {
    if (shape.shapeType === this.holeType) {
      let newHole = this.playState.createHole({x: this.gridX, y: this.gridY, type: this.holeType}, /*empty=*/false);
      --this.playState.holesToFill;
      this.playState.removeFromArray(this.playState.shapes, shape);
      shape.destroy();
      this.playState.holes[this.playState.holes.findIndex((hole) => hole === this)] = newHole;
      this.destroy();
    }
  }
}
