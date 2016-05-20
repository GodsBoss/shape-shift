class Preload {
  preload() {
    const preloadBackground = this.add.sprite(0, 0, 'preload-background');
    const preloaderBar = this.add.sprite(110, 110, 'preload-progress');
    preloaderBar.anchor.setTo(PhaserConstants.LEFT, PhaserConstants.TOP);
    this.load.setPreloadSprite(preloaderBar);

    [
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'crown',
      'filled-hole-hexagon',
      'filled-hole-pentagon',
      'filled-hole-square',
      'filled-hole-triangle',
      'highlight',
      'hole-hexagon',
      'hole-pentagon',
      'hole-square',
      'hole-triangle',
      'intro-background',
      'level-playable',
      'level-select-background',
      'level-select-marker',
      'play-background-1',
      'shape-hexagon',
      'shape-pentagon',
      'shape-square',
      'shape-triangle',
      'teleporter-particle',
      'trap',
      'turn-left',
      'turn-right',
      'vertex-add',
      'vertex-remove',
      'victory-background',
      'wall'
    ].forEach((key) => this.load.image(key, 'gfx/' + key + '.png'));

    const SPRITE_WIDTH = 16;
    const SPRITE_HEIGHT = 16;
    this.load.spritesheet('click-switch', 'gfx/click-switch.png', SPRITE_WIDTH, SPRITE_HEIGHT);
    this.load.spritesheet('pass-switch', 'gfx/pass-switch.png', SPRITE_WIDTH, SPRITE_HEIGHT);
    this.load.spritesheet('teleporter', 'gfx/teleporter.png', SPRITE_WIDTH, SPRITE_HEIGHT);

    const BUTTON_WIDTH = 56;
    const BUTTON_HEIGHT = 32;
    [
      'button-back-to-level-selection',
      'button-next-level',
      'button-reset-level',
      'button-victory'
    ].forEach((key) => this.load.spritesheet(key, 'gfx/' + key + '.png', BUTTON_WIDTH, BUTTON_HEIGHT));

    [
      'down',
      'fall-in-hole',
      'left',
      'level-beaten',
      'movement-stops',
      'right',
      'switch-disable',
      'switch-enable',
      'teleport',
      'trapped',
      'up'
    ].forEach((key) => this.load.audio(key, 'sfx/' + key + '.wav'));

    this.load.json('level-data', 'levels.json');
  }

  create() {
    this.state.start('Intro');
  }
}
