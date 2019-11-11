<template>
  <div class="canvas-container">
    <canvas
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
import { randInt } from '../utils/common';

export default {
  name: 'night-sky',
  props: {
    coefficients: Object,
    resizedTimes: Number,
    actionQueue: Array,
  },
  data() {
    return {
      canvasEl: null,
      ctx: null,
      fireworks: [],
      emitters: [],
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
    setEmitter() {
      this.emitters = [];
      const positions = this.calEmitPositions();
      for (let i = 0; i < this.numEmitter; i += 1) {
        this.emitters.push(new Emitter(positions[i], 50));
      }
    },
    draw() {
      window.requestAnimationFrame(this.draw);

      this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

      this.fireworks.forEach((f) => {
        f.draw(this.ctx);
      });
      this.emitters.forEach((emitter) => {
        emitter.draw(this.ctx);
      });
    },
    update() {
      this.fireworks = this.fireworks.filter(f => !f.isDiscard);
      this.fireworks.forEach((f) => {
        f.update();
      });
    },
    calEmitPositions() {
      const unitWidth = this.canvasEl.width / parseFloat(this.numEmitter);
      const positions = [];
      for (let i = 0; i < this.numEmitter; i += 1) {
        positions.push(new Point((i + 0.5) * unitWidth, this.canvasEl.height - 30));
      }
      return positions;
    },
    handleEmit(index, ratio) {
      const { pos } = this.emitters[index];
      const respondStrength = this.emitVel * ratio;
      const respondGravity = this.gravity.clone().scale(ratio);
      const dir = Vector.fromPCS(respondStrength, randInt(-85, -95));
      this.fireworks.push(new Firework(pos, dir, respondGravity, this.fragNum));
    },
    handleResize() {
      this.canvasEl.width = this.canvasEl.parentElement.clientWidth;
      this.canvasEl.height = this.canvasEl.parentElement.clientHeight;
      const positions = this.calEmitPositions();
      for (let i = 0; i < this.numEmitter; i += 1) {
        this.emitters[i].pos = positions[i];
      }
    },
  },
  mounted() {
    // Initial canvas element
    this.setCanvas();

    // Initial emitters
    this.setEmitter();

    // Update object infomation in 30 fps
    setInterval(() => {
      this.update(30.0 / 1000.0);
    }, 1000.0 / 30.0);

    // Call this.draw every frame
    window.requestAnimationFrame(this.draw);
  },
  computed: {
    gravity() {
      return new Vector(0, this.coefficients.gravity);
    },
    emitVel() {
      return this.coefficients.emitVel;
    },
    fragNum() {
      return this.coefficients.fragNum;
    },
    numEmitter() {
      return this.coefficients.numEmitter;
    },
  },
  watch: {
    resizedTimes() {
      this.handleResize();
    },
    numEmitter() {
      this.setEmitter();
    },
    actionQueue(actionList) {
      if (actionList.length < 1) return;

      actionList.forEach(({ ratio }) => {
        this.handleEmit(randInt(this.numEmitter), ratio);
      });
      this.$emit('clearQueue');
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
