class Play {
  constructor(playerProgress) {
    this.playerProgress = playerProgress;
  }

  init(level) {
    this.level = level;
  }

  create () {
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

  bringArrowsToTop() {
    for(let direction in this.arrows) {
      this.arrows[direction].bringToTop();
    }
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
    var arrow = this.add.sprite(0, 0, 'arrow-' + direction);
    arrow.visible = false;
    arrow.anchor.setTo(0.5, 0.5);
    arrow.vx = vx;
    arrow.vy = vy;
    arrow.inputEnabled = true;
    arrow.events.onInputUp.add((arrow) => this.moveCurrentShape(arrow));
    return arrow;
  }

  moveCurrentShape(arrow) {
    if (this.currentlyControlledShape && !this.currentlyControlledShape.currentlyMoving) {
      this.currentlyControlledShape.currentlyMoving = true;
      this.currentlyControlledShape.velocity = {
        x: arrow.vx,
        y: arrow.vy
      };
    }
    this.hideArrows();
  }

  createLevelObjects() {
    this.holesToFill = 0;
    this.walls = this.level.getWalls().map((wall) => this.createWall(wall));
    this.shapes = this.level.getShapes().map((shape) => this.createShape(shape));
    this.holes = this.level.getHoles().map((hole) => this.createHole(hole));
    this.bringArrowsToTop();
  }

  createWall(wall) {
    return this.createObject('wall', wall);
  }

  createShape(shape) {
    let sprite = this.createObject('shape-' + shape.type, shape);
    sprite.inputEnabled = true;
    sprite.events.onInputUp.add((sprite) => this.openShapeControls(sprite));
    sprite.currentlyMoving = false;
    sprite.velocity = { x: 0, y: 0 }; // Not a real velocity, more a direction.
    return sprite;
  }

  createHole(hole) {
    ++this.holesToFill;
    return this.createObject('hole-' + hole.type, hole);
  }

  createObject(spriteKey, object) {
    let sprite = this.add.sprite(this.calcX(object.x), this.calcY(object.y), spriteKey);
    sprite.gridX = object.x;
    sprite.gridY = object.y;
    sprite.anchor.setTo(0.5, 0.5);
    return sprite;
  }

  calcX(gridX) {
    return (gridX + 0.5) * 16 + 4;
  }

  calcY(gridY) {
    return (gridY + 0.5) * 16 + 4;
  }

  openShapeControls(shape) {
    if (shape === this.currentlyControlledShape || shape.currentlyMoving) {
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
    return this.walls.every((wall) => wall.gridX !== gridX || wall.gridY !== gridY);
  }

  clearLevelObjects() {
  }

  update () {
    this.shapes.filter((shape) => shape.currentlyMoving).forEach((shape) => this.moveShape(shape));
  }

  moveShape(shape) {
    shape.position.setTo(shape.x + shape.velocity.x, shape.y + shape.velocity.y);
  }

  backToLevelSelection() {
    this.state.start('LevelSelect', /*clearWorld=*/true, /*clearCache=*/false);
  }

  resetLevel() {
    this.clearLevelObjects();
    this.createLevelObjects();
  }
}
