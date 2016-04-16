class Preload {
  preload () {
    var preloadBackground = this.add.sprite(0, 0, 'preload-background');
    var preloaderBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preload-progress');
    preloaderBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(preloaderBar);
  }

  create () {
    this.state.start('Intro');
  }
}
