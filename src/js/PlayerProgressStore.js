class PlayerProgressStore {
  constructor (storage, key) {
    this.storage = storage;
    this.key = key;
  }

  load () {
    try {
      return PlayerProgress.fromJson(this.storage.getItem(this.key));
    } catch (e) {
      console.log('Loading player progress failed, return fresh progress.');
      return new PlayerProgress();
    }
  }

  save (progress) {
    try {
      this.storage.setItem(this.key, progress.toJson());
    } catch (e) {
      console.log('Saving player progress failed.');
    }
  }

  clear () {
    try {
      this.storage.removeItem(this.key);
    } catch (e) {
      console.log('Clearing player progress failed.');
    }
  }
}
