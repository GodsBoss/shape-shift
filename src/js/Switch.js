class Switch extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5, 0.5);
    this.clickState = null;
  }

  activate() {
    if (this.clickState !== null) {
      this.removeObjects(this.off);
    }
    this.clickState = true;
    this.frame = 0;
    this.addObjects(this.on);
  }

  deactivate() {
    if (this.clickState !== null) {
      this.removeObjects(this.on);
    }
    this.clickState = false;
    this.frame = 1;
    this.addObjects(this.off);
  }

  switchState() {
    this[this.clickState ? 'deactivate' : 'activate']();
    this.playState.refreshShapeControls();
  }

  addObjects(specs) {
    specs.forEach((spec) => this.addBySpec(spec));
  }

  addBySpec(spec) {
    if (spec.type === 'wall') {
      this.playState.walls.push(this.playState.createWall(spec));
    }
  }

  removeObjects(specs) {
    specs.forEach((spec) => this.removeBySpec(spec));
  }

  removeBySpec(spec) {
    this.playState.walls.
      filter((wall) => wall.gridX === spec.x && wall.gridY === spec.y).
      forEach((wall) => {
        this.playState.destroySpriteInArray(this.playState.walls, wall);
        wall.destroy();
      });
  }
}
