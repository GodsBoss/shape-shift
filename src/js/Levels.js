class Levels {
  constructor () {
    this.levels = [];
  }

  addLevel(level) {
    this.levels.push(level);
    this.levels.sort((left, right) => left.index - right.index);
  }

  onlyAvailableLevels(playerProgress) {
    return this.levels.filter((level) => level.isAccessible() || playerProgress.isAvailable(level.key));
  }
}

Levels.fromData = (data) => {
  var levels = new Levels();
  data.levels.forEach(
    (levelData) => levels.addLevel(Level.fromData(levelData))
  );
  return levels;
};
