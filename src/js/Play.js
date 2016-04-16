class Play {
  init(level) {
    this.level = level;
  }

  create () {
  }

  update () {
    // Immediately win!
    this.state.start('LevelSelect', /*clearWorld=*/true, /*clearCache=*/false);
  }
}
