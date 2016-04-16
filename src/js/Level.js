class Level {
  constructor(key, accessible, index) {
    this.key = key;
    this.accessible = accessible;
    this.unlocks = [];
    this.walls = [];
    this.shapes = [];
    this.holes = [];
    this.highlights = [];
    this.clickSwitches = [];
    this.index = index;
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

  addObject(object) {
    let x = object.x;
    let y = object.y;
    if (object.type === 'wall') {
      this.walls.push({x: x, y: y});
    }
    if (object.type.substring(0, 6) === 'shape-') {
      this.shapes.push({x: x, y: y, type: object.type.substring(6)})
    }
    if (object.type.substring(0, 5) === 'hole-') {
      this.holes.push({x: x, y: y, type: object.type.substring(5)});
    }
    if (object.type === 'click-switch') {
      this.clickSwitches.push(object);
    }
  }

  getWalls() {
    return this.walls;
  }

  getHoles() {
    return this.holes;
  }

  getShapes() {
    return this.shapes;
  }

  addHighlight(highlight) {
    this.highlights.push(highlight);
  }

  getHighlights() {
    return this.highlights;
  }

  getClickSwitches() {
    return this.clickSwitches;
  }
}

Level.fromData = (data) => {
  var level = new Level(data.key, !!data.access, +data.index);
  level.setUnlocks(data.unlocks || []);
  (data.objects||[]).forEach((object) => level.addObject(object));
  (data.highlights||[]).forEach((highlight) => level.addHighlight(highlight));
  return level;
};
