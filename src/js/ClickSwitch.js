class ClickSwitch extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.clickState = null;
  }

  activate() {
    if (this.clickState !== null) {
      this.removeObjects(this.off);
    }
    this.clickState = true;
    this.frame = 0;
    this.addObjects(this.on);
  }

  deactivate() {
    if (this.clickState !== null) {
      this.removeObjects(this.on);
    }
    this.clickState = false;
    this.frame = 1;
    this.addObjects(this.off);
  }

  switchState() {
    this[this.clickState ? 'deactivate' : 'activate']();
  }

  addObjects(specs) {}

  removeObjects(specs) {}
}
