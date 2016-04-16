class ClickSwitch extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.clickState = null;
  }

  activate() {
    this.clickState = true;
    this.frame = 0;
  }

  deactivate() {
    this.clickState = false;
    this.frame = 1;
  }

  switchState() {
    this[this.clickState ? 'deactivate' : 'activate']();
  }
}
