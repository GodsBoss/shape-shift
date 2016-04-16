class Play {
  constructor(playerProgress) {
    this.playerProgress = playerProgress;
  }

  init(level) {
    this.level = level;
  }

  create () {
  }

  update () {
    // Immediately win!
    this.playerProgress.levelBeaten(this.level);
    this.state.start('LevelSelect', /*clearWorld=*/true, /*clearCache=*/false);
  }
}
