class TeleporterParticle extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
  }

  update() {
    if (this.target) {
      const distance = Math.sqrt(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2));
      if (distance < TeleporterParticle.DISTANCE_THRESHOLD) {
        this.playState.destroySpriteInArray(this.playState.teleporterParticles, this);
      } else {
        this.position.setTo(
          this.position.x + TeleporterParticle.SPEED * (this.target.x - this.x) / distance + TeleporterParticle.RANDOMNESS * (Math.random() - 0.5),
          this.position.y + TeleporterParticle.SPEED * (this.target.y - this.y) / distance + TeleporterParticle.RANDOMNESS * (Math.random() - 0.5)
        );
      }
    } else {
      this.playState.destroySpriteInArray(this.playState.teleporterParticles, this);
    }
  }
}

TeleporterParticle.SPEED = 0.25;
TeleporterParticle.RANDOMNESS = 0.5;
TeleporterParticle.DISTANCE_THRESHOLD = 2;
