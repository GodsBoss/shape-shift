import GridObject from './GridObject';
import PhaserConstants from './PhaserConstants';

export default class Switch extends GridObject {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.clickState = null;
  }

  init(state, config) {
    this.playState = state;
    this.on = config.on;
    this.off = config.off;
    this[config.active ? 'activate' : 'deactivate']();
    if (this.key == 'click-switch') {
      this.inputEnabled = true;
      this.events.onInputUp.add((sprite) => sprite.switchState());
    }
  }

  blocks(shape) {
    return this.key === 'click-switch';
  }

  activate() {
    if (this.clickState !== null) {
      this.playState.sound.play('switch-enable');
      this.removeObjects(this.off);
    }
    this.clickState = true;
    this.frame = Switch.ACTIVE_FRAME;
    this.addObjects(this.on);
  }

  deactivate() {
    if (this.clickState !== null) {
      this.removeObjects(this.on);
      this.playState.sound.play('switch-disable');
    }
    this.clickState = false;
    this.frame = Switch.INACTIVE_FRAME;
    this.addObjects(this.off);
  }

  afterBlock(shape) {
    this.switchState();
  }

  switchState() {
    this[this.clickState ? 'deactivate' : 'activate']();
    this.playState.refreshShapeControls();
  }

  addObjects(specs) {
    specs.forEach((spec) => this.addBySpec(spec));
  }

  addBySpec(spec) {
    this.addBySpecIfTypeMatches('wall', spec, 'Wall');
    this.addBySpecIfTypeMatches('teleporter', spec, 'Teleporter');
    this.addBySpecIfTypeMatches('turn', spec, 'Turn');
    this.addBySpecIfTypeMatches('vertex', spec, 'VertexChange');
  }

  addBySpecIfTypeMatches(type, spec, entityName) {
    if (spec.type.substring(0, type.length) === type) {
      this.playState.gridObjects.push(this.playState['create' + entityName](spec));
    }
  }

  removeObjects(specs) {
    specs.forEach((spec) => this.removeBySpec(spec));
  }

  removeBySpec(spec) {
    this.removeBySpecIfTypeMatches('wall', spec);
    this.removeBySpecIfTypeMatches('teleporter', spec);
    this.removeBySpecIfTypeMatches('turn', spec);
    this.removeBySpecIfTypeMatches('vertex', spec);
  }

  removeBySpecIfTypeMatches(type, spec) {
    if (spec.type.substring(0, type.length) === type) {
      this.playState.gridObjects.
        filter((entity) => entity.gridX === spec.x && entity.gridY === spec.y).
        forEach((entity) => this.playState.destroySpriteInArray(this.playState.gridObjects, entity));
    }
  }
}

Switch.ACTIVE_FRAME = 0;
Switch.INACTIVE_FRAME = 1;
