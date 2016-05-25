import GridObject from './GridObject';

export default class Wall extends GridObject {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }
}
