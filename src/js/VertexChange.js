class VertexChange extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5, 0.5);
  }

  applyChangeTo(shape) {
    const currentVertices = VertexChange.vertices[shape.shapeType];
    const changedVertices = currentVertices + (this.change === 'add' ? 1 : -1);
    if (changedVertices >= 3 && changedVertices <= 6) {
      for(const type in VertexChange.vertices) {
        if (VertexChange.vertices[type] === changedVertices) {
          const newShape = this.playState.createShape(
            {
              type: type,
              x: shape.gridX,
              y: shape.gridY
            }
          );
          newShape.position.setTo(shape.position.x, shape.position.y);
          newShape.velocity = shape.velocity;
          this.playState.destroySpriteInArray(this.playState.shapes, shape);
          this.playState.shapes.push(newShape);
          this.playState.sound.play(this.change === 'add' ? 'up' : 'down');
        }
      }
    }
  }
}

VertexChange.vertices = {
  'triangle': 3,
  'square': 4,
  'pentagon': 5,
  'hexagon': 6
};
