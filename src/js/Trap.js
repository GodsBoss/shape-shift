class Trap extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  trap(shape) {
    if (this.prisoner) { // Release old prisoner
      const newShape = this.playState.createShape(
        {
          polygon: this.prisoner.prisonerType,
          x: this.gridX,
          y: this.gridY
        }
      );
      newShape.velocity = shape.velocity;
      this.playState.shapes.push(newShape);
      this.destroyTrappedSprite();
    }
    this.playState.sound.play('trapped');
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
    this.prisoner.scale = { x: Trap.PRISONER_SCALE, y: Trap.PRISONER_SCALE };
    this.prisoner.prisonerType = prisoner.substring('shape-'.length);
  }

  update() {
    if (this.prisoner) {
      this.prisoner.rotation += Trap.ROTATION_SPEED;
    }
  }

  destroy() {
    this.destroyTrappedSprite();
    super.destroy();
  }
}

Trap.ROTATION_SPEED = 0.01;
Trap.PRISONER_SCALE = 0.75;
