class Boot {
  preload() {
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(2, 2);
  }

  create () {
    this.state.start('Preload');
  }
}
