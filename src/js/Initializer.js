import Boot from './Boot';
import Intro from './Intro';
import LevelSelect from './LevelSelect';
import Play from './Play';
import PlayerProgress from './PlayerProgress';
import Preload from './Preload';
import Victory from './Victory';

export default class Initializer {
  constructor(elementId) {
    this.elementId = elementId;
  }

  init() {
    const WIDTH = 320;
    const HEIGHT = 200;
    this.game = new Phaser.Game(
      WIDTH,
      HEIGHT,
      /*renderer=*/Phaser.CANVAS,
      /*element_id=*/this.elementId,
      /*state=*/ null,
      /*transparent=*/false,
      /*anti_aliasing=*/false
    );
    const playerProgress = new PlayerProgress(window.localStorage, 'player-progress');
    playerProgress.load();
    this.game.state.add('Boot', new Boot(), /*autostart=*/true);
    this.game.state.add('Preload', new Preload());
    this.game.state.add('Intro', new Intro());
    this.game.state.add('LevelSelect', new LevelSelect(playerProgress));
    this.game.state.add('Play', new Play(playerProgress));
    this.game.state.add('Victory', new Victory());

    // For testing purposes.
    window.playerProgress = playerProgress;
  }
}
