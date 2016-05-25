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
  *
  * @param {Shape} The shape.
  */
  afterBlock(shape) {}

  /**
  * Wether this grid object acts as an obstacle, i.e. stops a shape before it
  * enters this field.
  *
  * @return {boolean}
  */
  blocks(shape) {
    return false;
  }
}
