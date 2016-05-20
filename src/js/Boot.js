class Boot {
  preload() {
    const SCALE = 2;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(SCALE, SCALE);

    this.load.image('preload-background', 'gfx/preload-background.png');
    this.load.image('preload-progress', 'gfx/preload-progress.png');
  }

  create() {
    this.state.start('Preload');
  }
}
