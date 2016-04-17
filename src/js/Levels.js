class Levels {
  constructor () {
    this.levels = [];
    this.accessGainedBy = {};
  }

  addLevel(level) {
    this.levels.push(level);
    level.unlocks.forEach(
      (levelUnlocked) => {
        this.accessGainedBy[levelUnlocked] = this.accessGainedBy[levelUnlocked] || [];
        this.accessGainedBy[levelUnlocked].push(level.key);
      }
    );
    this.levels.sort((left, right) => left.index - right.index);
  }

  onlyAvailableLevels(playerProgress) {
    return this.levels.filter((level) => level.isAccessible() || this.hasAccess(playerProgress, level));
  }

  hasAccess(playerProgress, level) {
    return (this.accessGainedBy[level.key] || []).some((level) => playerProgress.hasBeaten(level));
  }
}

Levels.fromData = (data) => {
  var levels = new Levels();
  data.levels.forEach(
    (levelData) => levels.addLevel(Level.fromData(levelData))
  );
  return levels;
};
