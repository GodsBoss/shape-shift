class Level {
  constructor(key, accessible) {
    this.key = key;
    this.accessible = accessible;
    this.unlocks = [];
  }

  getKey() {
    return this.key;
  }

  isAccessible() {
    return this.accessible;
  }

  unlockedLevels() {
    return this.unlocks;
  }

  setUnlocks(unlocks) {
    this.unlocks = unlocks;
  }
}

Level.fromData = (data) => {
  var level = new Level(data.key, !!data.access);
  level.setUnlocks(data.unlocks || []);
  return level;
};
