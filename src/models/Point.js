class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  valueOf() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2));
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  move(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  bias(offset = 10.0) {
    const xOffset = Math.random() * offset - offset;
    const yOffset = Math.random() * offset - offset;
    this.x += xOffset;
    this.y += yOffset;
    return this;
  }

  set assign(p) {
    this.x = p.x;
    this.y = p.y;
  }

  static distance(a, b) {
    const offsetX = a.x - b.x;
    const offsetY = a.y - b.y;
    return Math.sqrt((offsetX ** 2) + (offsetY ** 2));
  }
}

export default Point;
