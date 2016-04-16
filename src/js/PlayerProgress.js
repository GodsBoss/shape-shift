class PlayerProgress {
  constructor (store, key) {
    this.store = store;
    this.key = key;
    this.clearAvailableLevels();
  }

  clearAvailableLevels() {
    this.availableLevels = [];
  }

  makeAvailable (levelKey) {
    if (!this.availableLevels.includes(levelKey)) {
      this.availableLevels.push(levelKey);
    }
  }

  isAvailable (levelKey) {
    return this.availableLevels.includes(levelKey);
  }

  toJson () {
    return JSON.stringify(
      {
        availableLevels: this.availableLevels
      }
    );
  }

  levelBeaten(level) {
    if (level.unlockedLevels().length > 0) {
      level.unlockedLevels().forEach((key) => this.makeAvailable(key));
      this.save();
    }
  }

  save () {
    try {
      this.store.setItem(this.key, this.toJson());
    } catch (e) {
      console.log('Saving player progress failed.', e);
    }
  }

  load() {
    try {
      var data = JSON.parse(PlayerProgress.fromJson(this.store.getItem(this.key)));
    } catch (e) {
      console.log('Loading player progress failed, do not refresh.', e);
      return;
    }
    this.clearAvailableLevels();
    data.availableLevels.forEach((levelKey) => this.makeAvailable(levelKey));
  }

  clear() {
    try {
      this.store.removeItem(this.key);
    } catch (e) {
      console.log('Clearing player progress failed.', e);
    }
  }
}
