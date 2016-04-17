class Trap extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  trap(shape) {
    if (this.prisoner) { // Release old prisoner
      let newShape = this.playState.createShape(
        {
          type: this.prisoner.prisonerType,
          x: this.gridX,
          y: this.gridY
        }
      );
      newShape.velocity = shape.velocity;
      this.playState.shapes.push(newShape);
      this.destroyTrappedSprite();
    }
    this.imprison('shape-' + shape.shapeType);
    this.playState.destroySpriteInArray(this.playState.shapes, shape);
  }

  destroyTrappedSprite() {
    if (this.prisoner) {
      this.prisoner.destroy();
    }
  }

  imprison(prisoner) {
    this.prisoner = this.playState.createObject(
      this.playState.trapGroup,
      prisoner,
      { x: this.gridX, y: this.gridY }
    );
    this.prisoner.scale = { x: 0.75, y: 0.75 };
    this.prisoner.prisonerType = prisoner.substring(6);
  }

  update() {
    if (this.prisoner) {
      this.prisoner.rotation += 0.01;
    }
  }

  destroy() {
    this.destroyTrappedSprite();
    super.destroy();
  }
}
