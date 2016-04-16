class Level {
  constructor(key, accessible) {
    this.key = key;
    this.accessible = accessible;
  }

  getKey() {
    return this.key;
  }

  isAccessible() {
    return this.accessible;
  }
}

Level.fromData = (data) => {
  var level = new Level(data.key, !!data.access);
  return level;
};
