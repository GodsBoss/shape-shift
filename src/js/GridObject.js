export default class GridObject extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  init(state, config) {}

  /**
  * Called on a shape moving onto this grid field, before being blocked by an
  * obstacle.
  *
  * @param {Shape} The shape.
  */
  beforeBlock(shape) {}

  /**
  * Called on a shape moving onto this grid field, after being blocked by an
  * obstacle (i.e. its speed is zero).
  */
  afterBlock(shape) {}
}
