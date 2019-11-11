<template>
  <div class="control-panel">
    <p class="item-title">gravity: {{ parseFloat(gravity).toFixed(2) }}</p>
    <input
      class="slider"
      type="range"
      min="0"
      max="5"
      step="0.5"
      :value="gravity"
      @input.prevent="handleChangeCoef('gravity', $event)"
    />
    <div class="splitter"></div>
    <p class="item-title">initial speed: {{ parseFloat(emitVel).toFixed(2) }}</p>
    <input
      class="slider"
      type="range"
      min="10"
      max="100"
      step="5"
      :value="emitVel"
      @input.prevent="handleChangeCoef('emitVel', $event)"
    />
    <div class="splitter"></div>
    <p class="item-title">amount of fragments: {{ fragNum }}</p>
    <input
      class="slider"
      type="range"
      min="10"
      max="80"
      step="5"
      :value="fragNum"
      @input.prevent="handleChangeCoef('fragNum', $event)"
    />
    <div class="splitter"></div>
    <p class="item-title">emitters: {{ numEmitter }}</p>
    <input
      class="slider"
      type="range"
      min="1"
      max="10"
      step="1"
      :value="numEmitter"
      @input.prevent="handleChangeCoef('numEmitter', $event)"
    />
    <div class="splitter"></div>
    <div class="splitter"></div>
    <button
      class="reset-btn"
      @click="$emit('reset-coef')"
    >
      RESET
    </button>
  </div>
</template>

<script>
export default {
  props: {
    coefficients: Object,
  },
  computed: {
    gravity() {
      return this.coefficients.gravity;
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
  methods: {
    handleChangeCoef(key, e) {
      this.$emit('change-coef', key, parseFloat(e.target.value));
    },
  },
};
</script>

<style scoped>
.control-panel {
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 20px 15px;
  background-color: #e0f7fa;
  opacity: 0.7;
  border-radius: 5px;
}

.control-panel:hover {
  opacity: 1;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  outline: none;
  background-color: #cddc39;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #8bc34a;
}
.item-title {
  color: #33691e;
  margin: 0;
}
.splitter {
  margin-top: 10px;
}
.reset-btn {
  width: 100%;
  height: 20px;
  outline: none;
  border: none;
  margin: 0;
  background-color: #33691e;
  color: #FFF;
}
.reset-btn:hover {
  background-color: #8bc34a;
}

@media (max-width: 767px) {
  .control-panel {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
