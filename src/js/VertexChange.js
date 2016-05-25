import GridObject from './GridObject';
import PhaserConstants from './PhaserConstants';

export default class VertexChange extends GridObject {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  init(state, config) {
    this.playState = state;
    this.change = config.change;
  }

  afterBlock(shape) {
    const currentVertices = VertexChange.vertices[shape.shapeType];
    const changedVertices = currentVertices + VertexChange.change[this.change];
    if (changedVertices >= VertexChange.MINIMUM_VERTICES && changedVertices <= VertexChange.MAXIMUM_VERTICES) {
      for(const type in VertexChange.vertices) {
        if (VertexChange.vertices[type] === changedVertices) {
          const newShape = this.playState.createShape(
            {
              polygon: type,
              x: shape.gridX,
              y: shape.gridY
            }
          );
          newShape.position.setTo(shape.position.x, shape.position.y);
          newShape.velocity = shape.velocity;
          this.playState.destroySpriteInArray(this.playState.shapes, shape);
          this.playState.shapes.push(newShape);
          this.playState.sound.play(VertexChange.sounds[this.change]);
        }
      }
    }
  }
}

VertexChange.change = {
  add: 1,
  remove: -1
};

VertexChange.sounds = {
  add: 'up',
  remove: 'down'
};

VertexChange.vertices = {
  triangle: 3,
  square: 4,
  pentagon: 5,
  hexagon: 6
};

VertexChange.MINIMUM_VERTICES = 3;
VertexChange.MAXIMUM_VERTICES = 6;
