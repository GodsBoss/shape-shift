class Intro {
  create () {
    var introBackground = this.add.sprite(0, 0, 'intro-background');
    introBackground.inputEnabled = true;
    introBackground.events.onInputDown.add(() => this.state.start('LevelSelect'));
  }
}