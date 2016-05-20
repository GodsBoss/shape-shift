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
    this.passSwitches = [];
    this.turns = [];
    this.vertexChanges = [];
    this.teleporters = [];
    this.traps = [];
    this.index = index;
    this.last = false;
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
    const x = object.x;
    const y = object.y;
    if (object.type === 'wall') {
      this.walls.push({x: x, y: y});
    }
    if (object.type.substring(0, 6) === 'shape-') {
      this.shapes.push({x: x, y: y, type: object.type.substring(6)});
    }
    if (object.type.substring(0, 5) === 'hole-') {
      this.holes.push({x: x, y: y, type: object.type.substring(5)});
    }
    if (object.type === 'click-switch') {
      this.clickSwitches.push(object);
    }
    if (object.type === 'pass-switch') {
      this.passSwitches.push(object);
    }
    if (object.type.substring(0, 5) === 'turn-') {
      this.turns.push({x: x, y: y, direction: object.type.substring(5)});
    }
    if (object.type.substring(0, 7) === 'vertex-') {
      this.vertexChanges.push({x: x, y: y, change: object.type.substring(7)});
    }
    if (object.type === 'teleporter') {
      this.teleporters.push(object);
    }
    if (object.type === 'trap') {
      this.traps.push(object);
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

  getPassSwitches() {
    return this.passSwitches;
  }

  getTurns() {
    return this.turns;
  }

  getVertexChanges() {
    return this.vertexChanges;
  }

  getTeleporters() {
    return this.teleporters;
  }

  getTraps() {
    return this.traps;
  }

  isLast() {
    return this.last;
  }

  hasNextLevelKey() {
    return this.unlocks.length > 0;
  }

  getNextLevelKey() {
    return this.hasNextLevelKey() ? this.unlocks[0] : null;
  }
}

Level.fromData = (data) => {
  const level = new Level(data.key, !!data.access, +data.index);
  level.setUnlocks(data.unlocks || []);
  (data.objects||[]).forEach((object) => level.addObject(object));
  (data.highlights||[]).forEach((highlight) => level.addHighlight(highlight));
  level.last = !!data.last;
  return level;
};
