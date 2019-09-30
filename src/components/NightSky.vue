<template>
  <div class="canvas-container">
    <canvas ref="night-sky-canvas">Not support canvas</canvas>
  </div>
</template>

<script>
export default {
  name: 'night-sky',
  data() {
    return {
      canvasEl: null,
    };
  },
  methods: {
    setCanvas() {
      const canvasEl = this.$refs['night-sky-canvas'];
      this.ctx = canvasEl.getContext('2d');
      canvasEl.width = canvasEl.parentElement.clientWidth;
      canvasEl.height = canvasEl.parentElement.clientHeight;
    },
  },
  mounted() {
    this.setCanvas();
  },
};
</script>

<style scoped>
.canvas-container {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#070B34, #855988);
}
</style>
