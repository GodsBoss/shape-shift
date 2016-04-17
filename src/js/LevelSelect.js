class LevelSelect {
  constructor (playerProgress) {
    this.playerProgress = playerProgress;
  }

  create () {
    var introBackground = this.add.sprite(0, 0, 'level-select-background');
    this.levels = Levels.fromData(this.cache.getJSON('level-data'));
    this.levels.onlyAvailableLevels(this.playerProgress).forEach((level, index) => this.addLevelButton(level, index));
    if (this.playerProgress.hasBeatenLastLevel()) {
      this.addVictoryButton();
    } else {
      this.addNextLevelHighlight();
    }
    this.createLevelSelectMarker();
  }

  createLevelSelectMarker() {
    this.levelSelectMarker = this.add.sprite(0, 0, 'level-select-marker');
    this.levelSelectMarker.anchor.setTo(0.5, 0.5);
    this.hideLevelSelectMarker();
  }

  addLevelButton(level, index) {
    let position = this.calcPosition(index);
    let button = this.add.sprite(position.x, position.y, 'level-playable');
    button.anchor.setTo(0.5, 0.5);
    button.inputEnabled = true;
    button.events.onInputOver.add((button, event) => this.showLevelSelectMarkerAt(button.x, button.y));
    button.events.onInputOut.add(() => this.hideLevelSelectMarker());
    button.events.onInputUp.add((button, event) => this.startLevel(level));
  }

  calcPosition(index) {
    let grid = this.world.width / 10;
    return {
      x: (0.5 + index % 10) * grid,
      y: (0.5 + Math.floor(index / 10)) * grid
    };
  }

  showLevelSelectMarkerAt(x, y) {
    this.levelSelectMarker.visible = true;
    this.levelSelectMarker.position.setTo(x, y);
  }

  hideLevelSelectMarker() {
    this.levelSelectMarker.visible = false;
  }

  startLevel(level) {
    this.state.start('Play', /*clearWorld=*/true, /*clearCache=*/false, level);
  }

  addVictoryButton() {
    let button = this.add.sprite(310, 190, 'crown');
    button.anchor.setTo(1, 1);
    button.inputEnabled = true;
    button.events.onInputOver.add((button, event) => this.showLevelSelectMarkerAt(button.x - button.width/2, button.y - button.height/2));
    button.events.onInputOut.add(() => this.hideLevelSelectMarker());
    button.events.onInputUp.add(() => this.state.start('Victory'));
  }

  addNextLevelHighlight() {
    let position = this.calcPosition(this.levels.onlyAvailableLevels(this.playerProgress).length - 1);
    let group = this.add.group();
    group.classType = Highlight;
    this.nextLevelHighlight = group.create(position.x, position.y, 'highlight');
  }

  update() {
    if (this.nextLevelHighlight && this.nextLevelHighlight.canBeRemoved()) {
      this.nextLevelHighlight.destroy();
      this.nextLevelHighlight = null;
    }
  }
}
