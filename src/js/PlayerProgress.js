class PlayerProgress {
  constructor (store, key) {
    this.store = store;
    this.key = key;
    this.beatenLevels = [];
  }

  toJson () {
    return JSON.stringify(
      {
        beatenLevels: this.beatenLevels
      }
    );
  }

  hasBeaten(level) {
    return this.beatenLevels.includes(typeof level === 'string' ? level : level.key);
  }

  levelBeaten(level) {
    if (!this.hasBeaten(level)) {
      this.beatenLevels.push(level.key);
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
  }

  clear() {
    try {
      this.store.removeItem(this.key);
    } catch (e) {
      console.log('Clearing player progress failed.', e);
    }
  }
}
