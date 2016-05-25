export default class Level {
  constructor(key, accessible, index) {
    this.key = key;
    this.accessible = accessible;
    this.unlocks = [];
    this.objects = {};
    this.highlights = [];
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
    this.objects[object.type] = this.objects[object.type] || []
    this.objects[object.type].push(object)
  }

  getObjects(type) {
    return this.objects[type] || [];
  }

  getWalls() {
    return this.getObjects('wall');
  }

  getHoles() {
    return this.getObjects('hole');
  }

  getShapes() {
    return this.getObjects('shape');
  }

  addHighlight(highlight) {
    this.highlights.push(highlight);
  }

  getHighlights() {
    return this.highlights;
  }

  getClickSwitches() {
    return this.getObjects('click-switch');
  }

  getPassSwitches() {
    return this.getObjects('pass-switch');
  }

  getTurns() {
    return this.getObjects('turn');
  }

  getVertexChanges() {
    return this.getObjects('vertex-change');
  }

  getTeleporters() {
    return this.getObjects('teleporter');
  }

  getTraps() {
    return this.getObjects('trap');
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
