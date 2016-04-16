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
      down : this.createArrow('down'),
      left : this.createArrow('left'),
      right: this.createArrow('right'),
      up   : this.createArrow('up')
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

  createArrow (direction) {
    var arrow = this.add.sprite(0, 0, 'arrow-' + direction);
    arrow.visible = false;
    return arrow;
  }

  createLevelObjects() {
    this.walls = [];
    this.shapes = [];
    this.holes = [];
  }

  clearLevelObjects() {
  }

  update () {}

  backToLevelSelection() {
    this.state.start('LevelSelect', /*clearWorld=*/true, /*clearCache=*/false);
  }

  resetLevel() {
    this.clearLevelObjects();
    this.createLevelObjects();
  }
}
