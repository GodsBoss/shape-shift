class Hole extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  accept(shape) {
    if (this.empty && shape.shapeType === this.holeType) {
      const newHole = this.playState.createHole({x: this.gridX, y: this.gridY, type: this.holeType}, /*empty=*/false);
      --this.playState.holesToFill;
      this.playState.destroySpriteInArray(this.playState.shapes, shape);
      this.playState.holes[this.playState.holes.findIndex((hole) => hole === this)] = newHole;
      this.destroy();
      this.playState.sound.play('fall-in-hole');
    }
  }
}
