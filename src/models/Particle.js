import Point from './Point';
import Vector from './Vector';

class Particle {
  constructor(p, v, a, r) {
    this.oldPos = new Point(p.x, p.y);
    this.pos = new Point(p.x, p.y);
    this.vel = new Vector(v.x, v.y);
    this.acc = new Vector(a.x, a.y);
    this.radius = r;
    this.hue = Math.floor(Math.random() * 360);
    this.saturation = 100;
    this.lightness = 50;
    this.alpha = 0.5;
  }

  update(delta = 1.0) {
    this.oldPos = this.pos.clone();
    this.pos.move(this.vel.clone().scale(delta));
    this.vel.add(this.acc.clone().scale(delta));
    this.hue = (this.hue + 10) % 360;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.oldPos.x, this.oldPos.y);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.strokeStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
    ctx.lineWidth = this.radius;
    ctx.stroke();

    /*
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 2})`;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
    ctx.stroke();
    */
  }
}

export default Particle;
