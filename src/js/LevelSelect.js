class LevelSelect {
  constructor (playerProgress) {
    this.playerProgress = playerProgress;
  }

  create () {
    this.levels = new Levels(this.cache.getJSON('level-data'));
  }

  update () {
  }
}
