class Teleporter extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.target = null;
    this.animations.add('...', null, /*fps=*/8, /*loop=*/true).play();
    this.particlePressure = 0.5 + Math.random() * 0.5;
  }

  teleport(shape) {
    if (this.target) {
      shape.gridX = this.target.x;
      shape.gridY = this.target.y;
      shape.position.setTo(this.playState.calcX(shape.gridX), this.playState.calcY(shape.gridY));
      this.playState.sound.play('teleport');
    }
  }

  update() {
    super.update();
    if (this.target) {
      this.particlePressure += Math.random() * Teleporter.particleFrequency;
      if (this.particlePressure >= 1) {
        --this.particlePressure;
        const particle = this.playState.teleporterParticleGroup.create(this.playState.calcX(this.gridX), this.playState.calcY(this.gridY), 'teleporter-particle');
        particle.playState = this.playState;
        particle.target = { x: this.playState.calcX(this.target.x), y: this.playState.calcY(this.target.y) };
        this.playState.teleporterParticles.push(particle);
      }
    }
  }
}

Teleporter.particleFrequency = 0.02;
