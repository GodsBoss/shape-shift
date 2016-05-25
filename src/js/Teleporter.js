import GridObject from './GridObject';

export default class Teleporter extends GridObject {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.target = null;
    this.animations.add('...', null, /*fps=*/8, /*loop=*/true).play();
    this.particlePressure = Teleporter.INITIAL_PARTICLE_PRESSURE + Math.random() * Teleporter.INITIAL_PARTICLE_PRESSURE;
  }

  init(state, config) {
    const targetX = config['target-x'];
    const targetY = config['target-y'];
    if (typeof targetX === 'number' && typeof targetY === 'number') {
      this.target = { x: targetX, y: targetY };
    }
    this.playState = state;
  }

  beforeBlock(shape) {
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
      this.particlePressure += Math.random() * Teleporter.PARTICLE_FREQUENCY;
      if (this.particlePressure >= Teleporter.PARTICLE_PRESSURE_THRESHOLD) {
        --this.particlePressure;
        const particle = this.playState.spriteGroups.teleporterParticle.create(this.playState.calcX(this.gridX), this.playState.calcY(this.gridY), 'teleporter-particle');
        particle.playState = this.playState;
        particle.target = { x: this.playState.calcX(this.target.x), y: this.playState.calcY(this.target.y) };
        this.playState.teleporterParticles.push(particle);
      }
    }
  }
}

Teleporter.PARTICLE_FREQUENCY = 0.02;
Teleporter.INITIAL_PARTICLE_PRESSURE = 0.5;
Teleporter.PARTICLE_PRESSURE_THRESHOLD = 1;
