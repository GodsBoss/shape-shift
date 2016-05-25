import Highlight from './Highlight';
import Hole from './Hole';
import Levels from './Levels';
import PhaserConstants from './PhaserConstants';
import Shape from './Shape';
import Switch from './Switch';
import Teleporter from './Teleporter';
import TeleporterParticle from './TeleporterParticle';
import Trap from './Trap';
import Turn from './Turn';
import VertexChange from './VertexChange';

export default class Play {
  constructor(playerProgress) {
    this.playerProgress = playerProgress;
  }

  init(level) {
    this.level = level;
    this.shapeSpeed = 2.5;
    this.levelOver = false;
  }

  create() {
    const backgroundGroup = this.add.group();
    const background = backgroundGroup.create(0, 0, 'play-background-1');
    const groupKeys = {
      hole: Hole,
      passSwitch: Switch,
      turn: Turn,
      vertexChange: VertexChange,
      teleporter: Teleporter,
      trap: Trap,
      wall: null,
      clickSwitch: Switch,
      shape: Shape,
      teleporterParticle: TeleporterParticle,
      highlight: Highlight,
      arrow: null
    };
    this.spriteGroups = {};
    for (const groupKey in groupKeys) {
      this.spriteGroups[groupKey] = this.add.group();
      this.spriteGroups[groupKey].classType = groupKeys[groupKey] || Phaser.Sprite;
    }
    this.createArrows();
    this.nextLevelButton = this.createSidebarButton(136, 'button-next-level', 'nextLevel', /*hide=*/true);
    this.victoryButton = this.createSidebarButton(136, 'button-victory', 'viewVictory', /*hide=*/true);
    this.createSidebarButton(168, 'button-reset-level', 'resetLevel');
    this.createSidebarButton(200, 'button-back-to-level-selection', 'backToLevelSelection');
    this.createLevelObjects();
  }

  createArrows() {
    this.arrows = {
      down : this.createArrow('down', 0, 1),
      left : this.createArrow('left', -1, 0),
      right: this.createArrow('right', 1, 0),
      up   : this.createArrow('up', 0, -1)
    };
  }

  createSidebarButton(bottom, key, onClick, hide = false) {
    const button = this.add.sprite(320, bottom, key);
    button.anchor.setTo(PhaserConstants.ANCHOR_RIGHT, PhaserConstants.ANCHOR_BOTTOM);
    button.inputEnabled = true;
    button.events.onInputUp.add(() => this[onClick]());
    button.events.onInputOver.add((sprite) => sprite.frame = 1);
    button.events.onInputOut.add((sprite) => sprite.frame = 0);
    button.visible = !hide;
    return button;
  }

  createArrow(direction, vx, vy) {
    const arrow = this.spriteGroups.arrow.create(0, 0, 'arrow-' + direction);
    arrow.visible = false;
    arrow.anchor.setTo(PhaserConstants.ANCHOR_CENTER, PhaserConstants.ANCHOR_CENTER);
    arrow.vx = vx;
    arrow.vy = vy;
    arrow.inputEnabled = true;
    arrow.events.onInputUp.add((arrow) => this.moveCurrentShape(arrow));
    return arrow;
  }

  moveCurrentShape(arrow) {
    if (this.currentlyControlledShape && !this.currentlyControlledShape.currentlyMoving()) {
      this.currentlyControlledShape.initiateMove(arrow);
    }
    this.hideArrows();
    this.currentlyControlledShape = null;
  }

  createLevelObjects() {
    this.holesToFill = 0;
    this.walls = this.level.getWalls().map((wall) => this.createWall(wall));
    this.gridObjects = [].concat(
      this.level.getHoles().map((hole) => this.createHole(hole)),
      this.level.getVertexChanges().map((change) => this.createVertexChange(change)),
      this.level.getPassSwitches().map((passSwitch) => this.createPassSwitch(passSwitch)),
      this.level.getTurns().map((turn) => this.createTurn(turn)),
      this.level.getTeleporters().map((teleporter) => this.createTeleporter(teleporter)),
      this.level.getTraps().map((trap) => this.createTrap(trap))
    );
    this.shapes = this.level.getShapes().map((shape) => this.createShape(shape));
    this.highlights = this.level.getHighlights().map((highlight) => this.createHighlight(highlight));
    this.clickSwitches = this.level.getClickSwitches().map((clickSwitch) => this.createClickSwitch(clickSwitch));
    this.teleporterParticles = [];
  }

  createTrap(trap) {
    return this.createInitializedObject(this.spriteGroups.trap, 'trap', trap);
  }

  createTeleporter(teleporter) {
    return this.createInitializedObject(this.spriteGroups.teleporter, 'teleporter', teleporter);
  }

  createVertexChange(change) {
    return this.createInitializedObject(this.spriteGroups.vertexChange, 'vertex-' + change.change, change);
  }

  createTurn(turn) {
    return this.createInitializedObject(this.spriteGroups.turn, 'turn-' + turn.direction, turn);
  }

  createClickSwitch(clickSwitch) {
    return this.createInitializedObject(this.spriteGroups.clickSwitch, 'click-switch', clickSwitch);
  }

  createPassSwitch(passSwitch) {
    return this.createInitializedObject(this.spriteGroups.passSwitch, 'pass-switch', passSwitch);
  }

  createHighlight(highlight) {
    return this.spriteGroups.highlight.create(this.calcX(highlight.x), this.calcY(highlight.y), 'highlight');
  }

  createWall(wall) {
    return this.createObject(this.spriteGroups.wall, 'wall', wall);
  }

  createShape(shape) {
    const sprite = this.createObject(this.spriteGroups.shape, 'shape-' + shape.polygon, shape);
    sprite.inputEnabled = true;
    sprite.events.onInputUp.add((sprite) => this.openShapeControls(sprite));
    sprite.shapeType = shape.polygon;
    sprite.speed = this.shapeSpeed;
    return sprite;
  }

  createHole(hole) {
    return this.createInitializedObject(this.spriteGroups.hole, (hole.filled ? 'filled-' :'') + 'hole-' + hole.polygon, hole);
  }

  createInitializedObject(group, spriteKey, config) {
    const sprite = this.createObject(group, spriteKey, config);
    sprite.init(this, config);
    return sprite;
  }

  createObject(group, spriteKey, object) {
    const sprite = group.create(this.calcX(object.x), this.calcY(object.y), spriteKey);
    sprite.gridX = object.x;
    sprite.gridY = object.y;
    sprite.anchor.setTo(PhaserConstants.ANCHOR_CENTER, PhaserConstants.ANCHOR_CENTER);
    return sprite;
  }

  calcX(gridX) {
    return (gridX + 0.5) * 16 + 4;
  }

  calcBackX(x) {
    return (x - 4) / 16 - 0.5;
  }

  calcY(gridY) {
    return (gridY + 0.5) * 16 + 4;
  }

  calcBackY(y) {
    return (y - 4) / 16 - 0.5;
  }

  openShapeControls(shape) {
    if (shape === this.currentlyControlledShape || shape.currentlyMoving()) {
      return;
    }
    this.currentlyControlledShape = shape;
    this.hideArrows();
    for(const arrow in this.arrows) {
      const gridX = shape.gridX + this.arrows[arrow].vx;
      const gridY = shape.gridY + this.arrows[arrow].vy;
      if (this.gridIsFreeAt(gridX, gridY)) {
        this.arrows[arrow].visible = true;
        this.arrows[arrow].position.setTo(this.calcX(gridX), this.calcY(gridY));
      }
    }
  }

  refreshShapeControls() {
    const currentlyControlledShape = this.currentlyControlledShape;
    if (currentlyControlledShape) {
      this.currentlyControlledShape = null;
      this.openShapeControls(currentlyControlledShape);
    }
  }

  hideArrows() {
    for(const arrow in this.arrows) {
      this.arrows[arrow].visible = false;
    }
  }

  gridIsFreeAt(gridX, gridY, myself) {
    return gridX >= 0 && gridY >= 0 && gridX <= 15 && gridY <= 11 &&
      this.walls.every((wall) => wall.gridX !== gridX || wall.gridY !== gridY) &&
      this.clickSwitches.every((sw) => sw.gridX !== gridX || sw.gridY !== gridY) &&
      this.shapes.every((shape) => shape === myself || shape.currentlyMoving() || shape.gridX !== gridX || shape.gridY !== gridY);
  }

  clearLevelObjects() {
    [
      this.gridObjects,
      this.walls,
      this.shapes,
      this.highlights,
      this.clickSwitches,
      this.teleporterParticles
    ].forEach((sprites) => sprites.forEach((sprite) => sprite.destroy()));
  }

  update() {
    this.shapes.filter((shape) => shape.currentlyMoving()).forEach((shape) => this.moveShape(shape));
    if (this.holesToFill <= 0 && !this.levelOver) {
      this.levelOver = true;
      this.playerProgress.levelBeaten(this.level);
      this.sound.play('level-beaten');
      if (this.level.isLast()) {
        this.victoryButton.visible = true;
      } else {
        this.nextLevelButton.visible = true;
      }
    }
    this.highlights.
      filter((highlight) => highlight.canBeRemoved()).
      forEach((highlight) => this.destroySpriteInArray(this.highlights, highlight));
  }

  moveShape(shape) {
    const newGridX = this.calcBackX(shape.x);
    const newGridY = this.calcBackY(shape.y);
    if (shape.hasGridPositionChanged(newGridX, newGridY)) {
      shape.setGridPosition(shape.gridX + shape.velocity.x, shape.gridY + shape.velocity.y);
      this.findAndHandleSpecialField(this.gridObjects, shape, 'beforeBlock');
      if (!this.gridIsFreeAt(shape.gridX + shape.velocity.x, shape.gridY + shape.velocity.y, shape)) {
        shape.stop();
        this.sound.play('movement-stops');
        shape.position.setTo(this.calcX(shape.gridX), this.calcY(shape.gridY));
      }
      this.findAndHandleSpecialField(this.gridObjects, shape, 'afterBlock');
    }
  }

  findAndHandleSpecialField(fields, shape, method) {
    const index = fields.findIndex((field) => field.gridX === shape.gridX && field.gridY === shape.gridY);
    if (index !== -1) {
      fields[index][method](shape);
    }
  }

  destroySpriteInArray(array, sprite) {
    const index = array.findIndex((otherSprite) => otherSprite === sprite);
    array[index] = array[array.length-1];
    array.pop();
    sprite.destroy();
  }

  backToLevelSelection() {
    this.state.start('LevelSelect', /*clearWorld=*/true, /*clearCache=*/false);
  }

  resetLevel() {
    this.clearLevelObjects();
    this.hideArrows();
    this.currentlyControlledShape = null;
    this.createLevelObjects();
  }

  nextLevel() {
    if (this.level.hasNextLevelKey()) {
      const nextLevel = Levels.fromData(this.cache.getJSON('level-data')).getByKey(this.level.getNextLevelKey());
      if (nextLevel) {
        this.state.start('Play', /*clearWorld=*/true, /*clearCache=*/false, nextLevel);
      }
    }
  }

  viewVictory() {
    this.state.start('Victory');
  }
}
