import Highlight from './Highlight';
import Levels from './Levels';
import PhaserConstants from './PhaserConstants';

export default class LevelSelect {
  constructor(playerProgress) {
    this.playerProgress = playerProgress;
  }

  create() {
    const introBackground = this.add.sprite(0, 0, 'level-select-background');
    this.levels = Levels.fromData(this.cache.getJSON('level-data'));
    this.levels.onlyAvailableLevels(this.playerProgress).forEach((level, index) => this.addLevelButton(level, index));
    if (this.playerProgress.hasBeatenLastLevel()) {
      this.addVictoryButton();
    } else {
      this.addNextLevelHighlight();
    }
    this.createLevelSelectMarker();
  }

  createLevelSelectMarker() {
    this.levelSelectMarker = this.add.sprite(0, 0, 'level-select-marker');
    this.levelSelectMarker.anchor.setTo(PhaserConstants.ANCHOR_CENTER, PhaserConstants.ANCHOR_CENTER);
    this.hideLevelSelectMarker();
  }

  addLevelButton(level, index) {
    const position = this.calcPosition(index);
    const button = this.add.sprite(position.x, position.y, 'level-playable');
    button.anchor.setTo(PhaserConstants.ANCHOR_CENTER, PhaserConstants.ANCHOR_CENTER);
    button.inputEnabled = true;
    button.events.onInputOver.add((button, event) => this.showLevelSelectMarkerAt(button.x, button.y));
    button.events.onInputOut.add(() => this.hideLevelSelectMarker());
    button.events.onInputUp.add((button, event) => this.startLevel(level));
  }

  calcPosition(index) {
    const grid = this.world.width / LevelSelect.LEVELS_PER_ROW;
    return {
      x: (0.5 + index % LevelSelect.LEVELS_PER_ROW) * grid,
      y: (0.5 + Math.floor(index / LevelSelect.LEVELS_PER_ROW)) * grid
    };
  }

  showLevelSelectMarkerAt(x, y) {
    this.levelSelectMarker.visible = true;
    this.levelSelectMarker.position.setTo(x, y);
  }

  hideLevelSelectMarker() {
    this.levelSelectMarker.visible = false;
  }

  startLevel(level) {
    this.state.start('Play', PhaserConstants.CLEAR_WORLD, PhaserConstants.PRESERVE_CACHE, level);
  }

  addVictoryButton() {
    const button = this.add.sprite(310, 190, 'crown');
    button.anchor.setTo(PhaserConstants.ANCHOR_RIGHT, PhaserConstants.ANCHOR_BOTTOM);
    button.inputEnabled = true;
    button.events.onInputOver.add((button, event) => this.showLevelSelectMarkerAt(button.x - button.width/2, button.y - button.height/2));
    button.events.onInputOut.add(() => this.hideLevelSelectMarker());
    button.events.onInputUp.add(() => this.state.start('Victory'));
  }

  addNextLevelHighlight() {
    const position = this.calcPosition(this.levels.onlyAvailableLevels(this.playerProgress).length - 1);
    const group = this.add.group();
    group.classType = Highlight;
    this.nextLevelHighlight = group.create(position.x, position.y, 'highlight');
  }

  update() {
    if (this.nextLevelHighlight && this.nextLevelHighlight.canBeRemoved()) {
      this.nextLevelHighlight.destroy();
      this.nextLevelHighlight = null;
    }
    this.levelSelectMarker.rotation += LevelSelect.MARKER_ROTATION_SPEED;
  }
}

LevelSelect.MARKER_ROTATION_SPEED = 0.01;
LevelSelect.LEVELS_PER_ROW = 10;
