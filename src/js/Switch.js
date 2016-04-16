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
    this.addBySpecIfTypeMatches('wall', spec, 'walls', 'Wall');
    this.addBySpecIfTypeMatches('teleporter', spec, 'teleporters', 'Teleporter');
  }

  addBySpecIfTypeMatches(type, spec, collectionName, entityName) {
    if (spec.type === type) {
      this.playState[collectionName].push(this.playState['create' + entityName](spec));
    }
  }

  removeObjects(specs) {
    specs.forEach((spec) => this.removeBySpec(spec));
  }

  removeBySpec(spec) {
    this.removeBySpecIfTypeMatches('wall', spec, 'walls');
    this.removeBySpecIfTypeMatches('teleporter', spec, 'teleporters');
  }

  removeBySpecIfTypeMatches(type, spec, collectionName) {
    if (spec.type === type) {
      this.playState[collectionName].
        filter((entity) => entity.gridX === spec.x && entity.gridY === spec.y).
        forEach((entity) => this.playState.destroySpriteInArray(this.playState[collectionName], entity));
    }
  }
}
