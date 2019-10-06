import Point from './Point';

class Vector extends Point {
  get length() {
    return this.valueOf();
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  scale(ratio) {
    this.x *= ratio;
    this.y *= ratio;
    return this;
  }

  static fromPCS(len, angle) {
    const radian = Math.PI * (angle / 180.0);
    const x = len * Math.cos(radian);
    const y = len * Math.sin(radian);
    return new Vector(x, y);
  }

  static fromOffset(len, x, y) {
    const radian = Math.atan2(y, x);
    return new Vector(len * Math.cos(radian), len * Math.sin(radian));
  }
}

export default Vector;
