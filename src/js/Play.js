class Play {
  constructor(playerProgress) {
    this.playerProgress = playerProgress;
  }

  init(level) {
    this.level = level;
    this.shapeSpeed = 2.5;
  }

  create () {
    this.holeGroup = this.add.group();
    this.wallGroup = this.add.group();
    this.shapeGroup = this.add.group();
    this.shapeGroup.classType = Shape;
    this.highlightGroup = this.add.group();
    this.arrowGroup = this.add.group();
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
    var resetButton = this.add.sprite(272, 184, 'button-reset-level');
    resetButton.anchor.setTo(0.5, 0.5);
    resetButton.inputEnabled = true;
    resetButton.events.onInputUp.add(() => this.resetLevel());
  }

  createBackToLevelSelectionButton() {
    var backToLevelSelectionButton = this.add.sprite(304, 184, 'button-back-to-level-selection');
    backToLevelSelectionButton.anchor.setTo(0.5, 0.5);
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
  }

  createHighlight(highlight) {
    let sprite = this.highlightGroup.create(this.calcX(highlight.x), this.calcY(highlight.y), 'highlight');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.rotation = Math.random() * Math.PI * 2;
    sprite.rotationSpeed = 0.2;
    sprite.rotationSpeedFactor = 0.95;
    sprite.scale = { x: 2, y: 2 };
    sprite.scaleFactor = 0.98;
    return sprite;
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

  hideArrows() {
    for(let arrow in this.arrows) {
      this.arrows[arrow].visible = false;
    }
  }

  gridIsFreeAt(gridX, gridY) {
    return gridX >= 0 && gridY >= 0 && gridX <= 15 && gridY <= 11 && this.walls.every((wall) => wall.gridX !== gridX || wall.gridY !== gridY);
  }

  clearLevelObjects() {
    [this.walls, this.holes, this.shapes, this.highlights].forEach((sprites) => sprites.forEach((sprite) => sprite.destroy()));
  }

  update () {
    this.shapes.filter((shape) => shape.currentlyMoving()).forEach((shape) => this.moveShape(shape));
    if (this.holesToFill <= 0) {
      this.playerProgress.levelBeaten(this.level);
      this.backToLevelSelection();
    }
    this.highlights.forEach((highlight) =>  this.updateHighlight(highlight));
  }

  moveShape(shape) {
    let newGridX = this.calcBackX(shape.x);
    let newGridY = this.calcBackY(shape.y);
    if (shape.hasGridPositionChanged(newGridX, newGridY)) {
      shape.setGridPosition(shape.gridX + shape.velocity.x, shape.gridY + shape.velocity.y);
      if (!this.gridIsFreeAt(shape.gridX + shape.velocity.x, shape.gridY + shape.velocity.y)) {
        shape.stop();
        shape.position.setTo(this.calcX(shape.gridX), this.calcY(shape.gridY));
      }
      let holeIndex = this.getEmptyHoleIndex(shape.gridX, shape.gridY, shape.shapeType);
      if (holeIndex !== -1) {
        let hole = this.holes[holeIndex];
        let newHole = this.createHole({x: hole.gridX, y: hole.gridY, type: hole.holeType}, /*empty=*/false);
        this.holes[holeIndex] = newHole;
        hole.destroy();
        --this.holesToFill;
        this.removeFromArray(this.shapes, shape);
        shape.destroy();
      }
    }
  }

  getEmptyHoleIndex(gridX, gridY, type) {
    return this.holes.findIndex((hole) => hole.gridX == gridX && hole.gridY == gridY && hole.holeType == type);
  }

  updateHighlight(highlight) {
    highlight.rotationSpeed *= highlight.rotationSpeedFactor;
    highlight.rotation += highlight.rotationSpeed;
    highlight.scale.x *= highlight.scaleFactor;
    highlight.scale.y *= highlight.scaleFactor;
    if (highlight.scale.x < 0.5) {
      this.removeFromArray(this.highlights, highlight);
      highlight.destroy();
    }
  }

  removeFromArray(array, item) {
    let index = array.findIndex((otherItem) => item === otherItem);
    array[index] = array[array.length-1];
    return array.pop();
  }

  backToLevelSelection() {
    this.state.start('LevelSelect', /*clearWorld=*/true, /*clearCache=*/false);
  }

  resetLevel() {
    this.clearLevelObjects();
    this.createLevelObjects();
  }
}
