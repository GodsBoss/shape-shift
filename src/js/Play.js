class Play {
  constructor(playerProgress) {
    this.playerProgress = playerProgress;
  }

  init(level) {
    this.level = level;
    this.shapeSpeed = 2.5;
  }

  create () {
    let backgroundGroup = this.add.group();
    let background = backgroundGroup.create(0, 0, 'play-background-1');
    let groupKeys = {
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
    for (let groupKey in groupKeys) {
      this[groupKey + 'Group'] = this.add.group();
      this[groupKey + 'Group'].classType = groupKeys[groupKey] || Phaser.Sprite;
    }
    this.createArrows();
    this.createResetButton();
    this.createBackToLevelSelectionButton();
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

  createResetButton() {
    var resetButton = this.add.sprite(320, 168, 'button-reset-level');
    resetButton.anchor.setTo(1, 1);
    resetButton.inputEnabled = true;
    resetButton.events.onInputUp.add(() => this.resetLevel());
  }

  createBackToLevelSelectionButton() {
    var backToLevelSelectionButton = this.add.sprite(320, 200, 'button-back-to-level-selection');
    backToLevelSelectionButton.anchor.setTo(1, 1);
    backToLevelSelectionButton.inputEnabled = true;
    backToLevelSelectionButton.events.onInputUp.add(() => this.backToLevelSelection());
  }

  createArrow (direction, vx, vy) {
    var arrow = this.arrowGroup.create(0, 0, 'arrow-' + direction);
    arrow.visible = false;
    arrow.anchor.setTo(0.5, 0.5);
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
    this.holes = this.level.getHoles().map((hole) => this.createHole(hole));
    this.shapes = this.level.getShapes().map((shape) => this.createShape(shape));
    this.highlights = this.level.getHighlights().map((highlight) => this.createHighlight(highlight));
    this.turns = this.level.getTurns().map((turn) => this.createTurn(turn));
    this.vertexChanges = this.level.getVertexChanges().map((change) => this.createVertexChange(change));
    this.teleporters = this.level.getTeleporters().map((teleporter) => this.createTeleporter(teleporter));
    this.clickSwitches = this.level.getClickSwitches().map((clickSwitch) => this.createClickSwitch(clickSwitch));
    this.passSwitches = this.level.getPassSwitches().map((passSwitch) => this.createPassSwitch(passSwitch));
    this.traps = this.level.getTraps().map((trap) => this.createTrap(trap));
    this.teleporterParticles = [];
  }

  createTrap(trap) {
    let sprite = this.createObject(this.trapGroup, 'trap', trap);
    sprite.playState = this;
    if (trap.prisoner) {
      sprite.imprison(trap.prisoner);
    }
    return sprite;
  }

  createTeleporter(teleporter) {
    let sprite = this.createObject(this.teleporterGroup, 'teleporter', teleporter);
    sprite.playState = this;
    let targetX = teleporter['target-x'];
    let targetY = teleporter['target-y'];
    if (typeof targetX === 'number' && typeof targetY === 'number') {
      sprite.target = { x: targetX, y: targetY };
    }
    return sprite;
  }

  createVertexChange(change) {
    let sprite = this.createObject(this.vertexChangeGroup, 'vertex-' + change.change, change);
    sprite.playState = this;
    sprite.change = change.change;
    return sprite;
  }

  createTurn(turn) {
    let sprite = this.createObject(this.turnGroup, 'turn-' + turn.direction, turn);
    sprite.direction = turn.direction;
    return sprite;
  }

  createClickSwitch(clickSwitch) {
    let sprite = this.clickSwitchGroup.create(this.calcX(clickSwitch.x), this.calcY(clickSwitch.y), 'click-switch');
    sprite.playState = this;
    sprite.gridX = clickSwitch.x;
    sprite.gridY = clickSwitch.y;
    sprite.on = clickSwitch.on;
    sprite.off = clickSwitch.off;
    sprite[clickSwitch.active ? 'activate' : 'deactivate']();
    sprite.inputEnabled = true;
    sprite.events.onInputUp.add((sprite) => sprite.switchState());
    return sprite;
  }

  createPassSwitch(passSwitch) {
    let sprite = this.clickSwitchGroup.create(this.calcX(passSwitch.x), this.calcY(passSwitch.y), 'pass-switch');
    sprite.gridX = passSwitch.x;
    sprite.gridY = passSwitch.y;
    sprite.playState = this;
    sprite.on = passSwitch.on;
    sprite.off = passSwitch.off;
    sprite[passSwitch.active ? 'activate' : 'deactivate']();
    return sprite;
  }

  createHighlight(highlight) {
    return this.highlightGroup.create(this.calcX(highlight.x), this.calcY(highlight.y), 'highlight');
  }

  createWall(wall) {
    return this.createObject(this.wallGroup, 'wall', wall);
  }

  createShape(shape) {
    let sprite = this.createObject(this.shapeGroup, 'shape-' + shape.type, shape);
    sprite.inputEnabled = true;
    sprite.events.onInputUp.add((sprite) => this.openShapeControls(sprite));
    sprite.shapeType = shape.type;
    sprite.speed = this.shapeSpeed;
    return sprite;
  }

  createHole(hole, empty = true) {
    if (empty) {
      ++this.holesToFill;
    }
    let sprite = this.createObject(this.holeGroup, (empty ? '' : 'filled-') + 'hole-' + hole.type, hole);
    sprite.playState = this;
    sprite.holeType = hole.type;
    sprite.empty = empty;
    return sprite;
  }

  createObject(group, spriteKey, object) {
    let sprite = group.create(this.calcX(object.x), this.calcY(object.y), spriteKey);
    sprite.gridX = object.x;
    sprite.gridY = object.y;
    sprite.anchor.setTo(0.5, 0.5);
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
    for(let arrow in this.arrows) {
      let gridX = shape.gridX + this.arrows[arrow].vx;
      let gridY = shape.gridY + this.arrows[arrow].vy;
      if (this.gridIsFreeAt(gridX, gridY)) {
        this.arrows[arrow].visible = true;
        this.arrows[arrow].position.setTo(this.calcX(gridX), this.calcY(gridY));
      }
    }
  }

  refreshShapeControls()
  {
    let currentlyControlledShape = this.currentlyControlledShape;
    if (currentlyControlledShape) {
      this.currentlyControlledShape = null;
      this.openShapeControls(currentlyControlledShape);
    }
  }

  hideArrows() {
    for(let arrow in this.arrows) {
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
      this.walls,
      this.holes,
      this.shapes,
      this.highlights,
      this.clickSwitches,
      this.passSwitches,
      this.turns,
      this.vertexChanges,
      this.teleporters,
      this.teleporterParticles
    ].forEach((sprites) => sprites.forEach((sprite) => sprite.destroy()));
    this.traps.forEach((trap) => {
      trap.destroyTrappedSprite();
      trap.destroy();
    });
  }

  update () {
    this.shapes.filter((shape) => shape.currentlyMoving()).forEach((shape) => this.moveShape(shape));
    if (this.holesToFill <= 0) {
      this.playerProgress.levelBeaten(this.level);
      this.backToLevelSelection();
    }
    this.highlights.
      filter((highlight) => highlight.canBeRemoved()).
      forEach((highlight) => this.destroySpriteInArray(this.highlights, highlight));
  }

  moveShape(shape) {
    let newGridX = this.calcBackX(shape.x);
    let newGridY = this.calcBackY(shape.y);
    if (shape.hasGridPositionChanged(newGridX, newGridY)) {
      shape.setGridPosition(shape.gridX + shape.velocity.x, shape.gridY + shape.velocity.y);
      this.findAndHandleSpecialField(this.turns, shape, 'turn');
      this.findAndHandleSpecialField(this.teleporters, shape, 'teleport');
      this.findAndHandleSpecialField(this.traps, shape, 'trap');
      if (!this.gridIsFreeAt(shape.gridX + shape.velocity.x, shape.gridY + shape.velocity.y, shape)) {
        shape.stop();
        shape.position.setTo(this.calcX(shape.gridX), this.calcY(shape.gridY));
      }
      this.findAndHandleSpecialField(this.holes, shape, 'accept');
      this.findAndHandleSpecialField(this.passSwitches, shape, 'switchState');
      this.findAndHandleSpecialField(this.vertexChanges, shape, 'applyChangeTo');
    }
  }

  findAndHandleSpecialField(fields, shape, method) {
    let index = fields.findIndex((field) => field.gridX === shape.gridX && field.gridY === shape.gridY);
    if (index !== -1) {
      fields[index][method](shape);
    }
  }

  destroySpriteInArray(array, sprite) {
    let index = array.findIndex((otherSprite) => otherSprite === sprite);
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
}
