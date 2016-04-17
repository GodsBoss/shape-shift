class PlayerProgress {
  constructor (store, key) {
    this.store = store;
    this.key = key;
    this.beatenLevels = [];
    this.beatenLastLevel = false;
  }

  toJson () {
    return JSON.stringify(
      {
        beatenLevels: this.beatenLevels,
        beatenLastLevel: this.beatenLastLevel
      }
    );
  }

  hasBeaten(level) {
    return this.beatenLevels.includes(typeof level === 'string' ? level : level.key);
  }

  hasBeatenLastLevel() {
    return this.beatenLastLevel;
  }

  levelBeaten(level) {
    let dirty = false;
    if (!this.hasBeaten(level)) {
      this.beatenLevels.push(level.key);
      dirty = true;
    }
    if (level.isLast() && !this.beatenLastLevel) {
      this.beatenLastLevel = true;
      dirty = true;
    }
    if (dirty) {
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
      var data = JSON.parse(this.store.getItem(this.key));
    } catch (e) {
      console.log('Loading player progress failed, do not refresh.', e);
      return;
    }
    if (data === null) {
      console.log('No stored player progress found.');
      return;
    }
    this.beatenLevels = [];
    if (Array.isArray(data.beatenLevels)) {
      this.beatenLevels = data.beatenLevels.slice();
    }
    this.beatenLastLevel = !!data.beatenLastLevel;
  }

  clear() {
    try {
      this.store.removeItem(this.key);
    } catch (e) {
      console.log('Clearing player progress failed.', e);
    }
  }
}
