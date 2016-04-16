class TeleporterParticle extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  update() {
    if (this.target) {
      let distance = Math.sqrt(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2));
      if (distance < TeleporterParticle.distanceThreshold) {
        this.playState.destroySpriteInArray(this.playState.teleporterParticles, this);
      } else {
        this.position.setTo(
          this.position.x + TeleporterParticle.speed * (this.target.x - this.x) / distance + TeleporterParticle.randomness * (Math.random() - 0.5),
          this.position.y + TeleporterParticle.speed * (this.target.y - this.y) / distance + TeleporterParticle.randomness * (Math.random() - 0.5)
        );
      }
    } else {
      this.playState.destroySpriteInArray(this.playState.teleporterParticles, this);
    }
  }
}

TeleporterParticle.speed = 0.25;
TeleporterParticle.randomness = 0.5;
TeleporterParticle.distanceThreshold = 2;
