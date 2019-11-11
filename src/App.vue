<template>
  <div id="app">
    <night-sky
      :coefficients="coefficients"
      :resizedTimes="resizedTimes"
      :actionQueue="actionQueue"
      @clearQueue="handleClearQueue"
    />
    <control-panel
      :coefficients="coefficients"
      v-on:change-coef="handleChangeCoef"
      v-on:reset-coef="handleResetCoef"
    />
    <a
      class="github-link"
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/miksin/web-firework-simulation"
    >
      <img src="./assets/GitHub-Mark-Light-64px.png" alt="Github"/>
    </a>
    <resize-observer @notify="handleResize"/>
  </div>
</template>

<script>
import { ResizeObserver } from 'vue-resize';
import NightSky from './components/NightSky.vue';
import ControlPanel from './components/ControlPanel.vue';
import { screenHeightRatio, mobileWidth, randActions } from './utils/common';
import 'vue-resize/dist/vue-resize.css';

export default {
  name: 'app',
  components: {
    NightSky,
    ControlPanel,
    ResizeObserver,
  },
  data() {
    return {
      coefficients: this.defaultCoef(screenHeightRatio()),
      actionQueue: [],
      resizeTimer: null,
      resizedTimes: 0,
    };
  },
  methods: {
    defaultCoef(ratio = 1.0) {
      const numEmitter = mobileWidth() ? 1 : 3;
      return {
        gravity: 1 * ratio,
        emitVel: 40 * ratio,
        fragNum: 60 * ratio,
        numEmitter,
      };
    },
    handleChangeCoef(key, value) {
      this.coefficients = {
        ...this.coefficients,
        [key]: value,
      };
    },
    handleResetCoef() {
      this.coefficients = this.defaultCoef(screenHeightRatio());
    },
    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.resizedTimes += 1;
        this.coefficients = this.defaultCoef(screenHeightRatio());
      }, 500);
    },
    handleEnqueue(actionList) {
      this.actionQueue.push(...actionList);
    },
    handleClearQueue() {
      this.actionQueue = [];
    },
  },
  mounted() {
    setInterval(() => {
      randActions().then(r => this.handleEnqueue(r));
    }, 1000);
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  position: relative;
  width: 100vw;
  height: 100vh;
}
.github-link {
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  background-color: #000;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
}
.github-link:hover {
  opacity: 1.0;
}
.github-link > img {
  width: 100%;
  height: 100%;
}

@media (max-width: 767px) {
  .github-link {
    top: 20px;
    width: 30px;
    height: 30px;
  }
}
</style>
