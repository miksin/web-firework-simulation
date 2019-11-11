<template>
  <div class="canvas-container">
    <canvas
      @mousemove="handleMouseMove"
      @click="handleMouseClick"
      ref="night-sky-canvas"
    >
      Not support canvas
    </canvas>
  </div>
</template>

<script>
import Firework from '../models/Firework';
import Point from '../models/Point';
import Vector from '../models/Vector';
import Emitter from '../models/Emitter';

export default {
  name: 'night-sky',
  props: {
    coefficients: Object,
  },
  data() {
    return {
      canvasEl: null,
      ctx: null,
      fireworks: [],
      emitter: null,
    };
  },
  methods: {
    setCanvas() {
      this.canvasEl = this.$refs['night-sky-canvas'];
      this.ctx = this.canvasEl.getContext('2d');
      this.ctx.globalCompositeOperation = 'lighter';
      this.canvasEl.width = this.canvasEl.parentElement.clientWidth;
      this.canvasEl.height = this.canvasEl.parentElement.clientHeight;
    },
    draw() {
      window.requestAnimationFrame(this.draw);

      this.ctx.clearRect(0, 0, this.cw, this.ch);

      this.ctx.font = '24px Arial';
      this.ctx.fillStyle = '#FFF';
      this.ctx.fillText('Mouse click to fire', 10, 50);

      this.fireworks.forEach((f) => {
        f.draw(this.ctx);
      });
      this.emitter.draw(this.ctx);
    },
    update() {
      this.fireworks = this.fireworks.filter(f => !f.isDiscard);
      this.fireworks.forEach((f) => {
        f.update();
      });
    },
    handleMouseMove(e) {
      const x = e.clientX;
      const y = e.clientY;
      this.emitter.faceTo(x, y);
    },
    handleMouseClick(e) {
      const x = e.clientX;
      const y = e.clientY;
      const xOffset = x - this.emitPos.x;
      const yOffset = y - this.emitPos.y;

      const dir = Vector.fromOffset(this.emitVel, xOffset, yOffset);
      this.fireworks.push(new Firework(this.emitPos, dir, this.gravity, this.fragNum));
    },
  },
  mounted() {
    this.setCanvas();

    this.emitter = new Emitter(this.emitPos, 50);

    setInterval(() => {
      this.update(30.0 / 1000.0);
    }, 1000.0 / 30.0);

    window.requestAnimationFrame(this.draw);
  },
  computed: {
    cw() {
      return this.canvasEl.width;
    },
    ch() {
      return this.canvasEl.height;
    },
    emitPos() {
      return new Point(this.canvasEl.width / 2, this.canvasEl.height - 30);
    },
    gravity() {
      return new Vector(0, this.coefficients.gravity);
    },
    emitVel() {
      return this.coefficients.emitVel;
    },
    fragNum() {
      return this.coefficients.fragNum;
    },
  },
};
</script>

<style scoped>
.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#000000, #070B34);
}
</style>
