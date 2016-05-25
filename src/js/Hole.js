import GridObject from './GridObject';

export default class Hole extends GridObject {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  init(state, config) {
    this.playState = state;
    this.holeType = config.polygon;
    this.empty = !config.filled;
    if (this.empty) {
      ++state.holesToFill;
    }
  }

  afterBlock(shape) {
    if (this.empty && shape.shapeType === this.holeType) {
      const newHole = this.playState.createHole({x: this.gridX, y: this.gridY, polygon: this.holeType, filled: true});
      --this.playState.holesToFill;
      this.playState.destroySpriteInArray(this.playState.shapes, shape);
      this.playState.gridObjects.push(newHole);
      this.playState.sound.play('fall-in-hole');
      this.playState.destroySpriteInArray(this.playState.gridObjects, this);
    }
  }
}
