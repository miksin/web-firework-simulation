import Particle from './Particle';
import Vector from './Vector';
import { randInt } from '../utils/common';

class Firework {
  constructor(emitPos, emitVel, g, fragNum = 40) {
    this.particles = [];
    this.isExplode = false;
    this.isDiscard = false;
    this.emitTime = new Date();
    this.gravity = g;
    this.fragNum = fragNum;
    this.emitVel = emitVel.clone();
    this.emitPos = emitPos.clone();

    this.particles.push(new Particle(this.emitPos, this.emitVel, g.clone(), 3));
  }

  draw(ctx) {
    this.particles.forEach((particle) => {
      particle.draw(ctx);
    });
  }

  update(delta = 1.0) {
    const now = new Date();
    if (!this.isExplode && (this.particles[0].vel.y > 0 || now - this.emitTime > 1500)) {
      const explodePos = this.particles[0].pos.clone();
      this.isExplode = true;
      this.particles = [];

      for (let i = 0; i < this.fragNum; i += 1) {
        const dir = Vector.fromPCS(
          randInt(this.emitVel.valueOf() - 15, this.emitVel.valueOf() - 30),
          randInt(0, 360),
        );
        const p = new Particle(explodePos, dir, this.gravity, 2);
        this.particles.push(p);
      }
    }

    if (this.isExplode && now - this.emitTime > 5000) {
      this.isDiscard = true;
      this.particles = [];
    }

    this.particles.forEach((particle) => {
      particle.update(delta);
    });
  }
}

export default Firework;
