export default class Victory {
  create() {
    const background = this.add.sprite(0, 0, 'victory-background');
    background.inputEnabled = true;
    background.events.onInputUp.add(() => this.state.start('LevelSelect'));
  }
}
