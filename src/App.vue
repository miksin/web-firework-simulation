<template>
  <div id="app">
    <night-sky />
  </div>
</template>

<script>
import NightSky from './components/NightSky.vue';

export default {
  name: 'app',
  components: {
    NightSky,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}
body {
  margin: 0;
}
</style>
