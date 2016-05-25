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
    this.addBySpecIfTypeMatches('wall', spec, 'walls', 'Wall');
    this.addBySpecIfTypeMatches('teleporter', spec, 'teleporters', 'Teleporter');
    this.addBySpecIfTypeMatches('turn', spec, 'turns', 'Turn');
    this.addBySpecIfTypeMatches('vertex', spec, 'vertexChanges', 'VertexChange');
  }

  addBySpecIfTypeMatches(type, spec, collectionName, entityName) {
    if (spec.type.substring(0, type.length) === type) {
      this.playState[collectionName].push(this.playState['create' + entityName](spec));
    }
  }

  removeObjects(specs) {
    specs.forEach((spec) => this.removeBySpec(spec));
  }

  removeBySpec(spec) {
    this.removeBySpecIfTypeMatches('wall', spec, 'walls');
    this.removeBySpecIfTypeMatches('teleporter', spec, 'teleporters');
    this.removeBySpecIfTypeMatches('turn', spec, 'turns');
    this.removeBySpecIfTypeMatches('vertex', spec, 'vertexChanges');
  }

  removeBySpecIfTypeMatches(type, spec, collectionName) {
    if (spec.type.substring(0, type.length) === type) {
      this.playState[collectionName].
        filter((entity) => entity.gridX === spec.x && entity.gridY === spec.y).
        forEach((entity) => this.playState.destroySpriteInArray(this.playState[collectionName], entity));
    }
  }
}

Switch.ACTIVE_FRAME = 0;
Switch.INACTIVE_FRAME = 1;
