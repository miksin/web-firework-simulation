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
  </div>
</template>

<script>
import NightSky from './components/NightSky.vue';
import ControlPanel from './components/ControlPanel';
import Vector from './models/Vector';

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
        emitVel: 40,
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  position: relative;
  width: 100vw;
  height: 100vh;
}
body {
  margin: 0;
}
</style>
