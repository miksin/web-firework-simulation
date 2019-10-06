<template>
  <div id="app">
    <night-sky
      :coefficients="coefficients"
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
  </div>
</template>

<script>
import NightSky from './components/NightSky.vue';
import ControlPanel from './components/ControlPanel.vue';

export default {
  name: 'app',
  components: {
    NightSky,
    ControlPanel,
  },
  data() {
    return {
      coefficients: this.defaultCoef(),
    };
  },
  methods: {
    defaultCoef() {
      return {
        gravity: 1,
        emitVel: 35,
        fragNum: 40,
      };
    },
    handleChangeCoef(key, value) {
      this.coefficients = {
        ...this.coefficients,
        [key]: value,
      };
    },
    handleResetCoef() {
      this.coefficients = this.defaultCoef();
    },
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
</style>
