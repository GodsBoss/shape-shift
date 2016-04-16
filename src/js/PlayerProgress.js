class PlayerProgress {
  constructor () {
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
}

PlayerProgress.fromJson = (json) => {
  var progress = new PlayerProgress();
  var data = JSON.parse(json);
  data.availableLevels.forEach((levelKey) => progress.makeAvailable(levelKey));
  return progress;
};
