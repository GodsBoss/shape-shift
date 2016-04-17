class LevelSelect {
  constructor (playerProgress) {
    this.playerProgress = playerProgress;
  }

  create () {
    var introBackground = this.add.sprite(0, 0, 'level-select-background');
    this.createLevelSelectMarker();
    this.levels = Levels.fromData(this.cache.getJSON('level-data'));
    this.levels.onlyAvailableLevels(this.playerProgress).forEach((level, index) => this.addLevelButton(level, index));
  }

  createLevelSelectMarker() {
    this.levelSelectMarker = this.add.sprite(0, 0, 'level-select-marker');
    this.levelSelectMarker.anchor.setTo(0.5, 0.5);
    this.hideLevelSelectMarker();
  }

  addLevelButton(level, index) {
    var grid = this.world.width / 10;
    var x = (0.5 + index % 10) * grid;
    var y = (0.5 + Math.floor(index / 10)) * grid;
    var button = this.add.sprite(x, y, 'level-playable');
    button.anchor.setTo(0.5, 0.5);
    button.inputEnabled = true;
    button.events.onInputOver.add((button, event) => this.showLevelSelectMarkerAt(button.x, button.y));
    button.events.onInputOut.add(() => this.hideLevelSelectMarker());
    button.events.onInputUp.add((button, event) => this.startLevel(level));
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
}
