class Preload {
  preload () {
    var preloadBackground = this.add.sprite(0, 0, 'preload-background');
    var preloaderBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preload-progress');
    preloaderBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(preloaderBar);

    [
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'filled-hole-hexagon',
      'filled-hole-pentagon',
      'filled-hole-square',
      'filled-hole-triangle',
      'hole-hexagon',
      'hole-pentagon',
      'hole-square',
      'hole-triangle',
      'intro-background',
      'level-playable',
      'level-select-marker',
      'shape-hexagon',
      'shape-pentagon',
      'shape-square',
      'shape-triangle',
      'wall'
    ].forEach((key) => this.load.image(key, 'gfx/' + key + '.png'));

    this.load.json('level-data', 'levels.json');
  }

  create () {
    this.state.start('Intro');
  }
}
