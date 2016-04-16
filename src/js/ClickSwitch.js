class ClickSwitch extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.clickState = null;
  }

  activate() {
    this.clickState = true;
    this.frame = 0;
    this.removeObjects(this.off);
    this.addObjects(this.on);
  }

  deactivate() {
    this.clickState = false;
    this.frame = 1;
    this.removeObjects(this.on);
    this.addObjects(this.off);
  }

  switchState() {
    this[this.clickState ? 'deactivate' : 'activate']();
  }

  addObjects(specs) {}

  removeObjects(specs) {}
}
