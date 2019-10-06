import Vector from './Vector';

class Emitter {
  constructor(pos, size) {
    this.pos = pos.clone();
    this.angle = -90;
    this.size = size;
  }

  faceTo(x, y) {
    const xOffset = x - this.pos.x;
    const yOffset = y - this.pos.y;
    this.angle = 180 * Math.atan2(yOffset, xOffset) / Math.PI;
    return this;
  }

  draw(ctx) {
    const endPos = this.pos.clone().move(Vector.fromPCS(this.size, this.angle));

    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(endPos.x, endPos.y);

    ctx.strokeStyle = '#FFB266';
    ctx.lineWidth = this.size / 3;
    ctx.stroke();
  }
}

export default Emitter;
