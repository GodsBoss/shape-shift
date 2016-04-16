class LevelSelect {
  constructor (playerProgressStore) {
    this.playerProgressStore = playerProgressStore;
  }

  create () {
    this.levels = Levels.fromData(this.cache.getJSON('level-data'));
    this.levels.onlyAvailableLevels(this.playerProgressStore.load()).forEach((level, index) => this.addLevelButton(level, index));
  }

  addLevelButton(level, index) {
    var grid = this.world.width / 10;
    var x = (0.5 + index % 10) * grid;
    var y = (0.5 + Math.floor(index / 10)) * grid;
    var button = this.add.sprite(x, y, 'level-playable');
  }

  update () {
  }
}
