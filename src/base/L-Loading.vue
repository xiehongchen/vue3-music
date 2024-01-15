<template>
  <div class="l-loading" :class="[customClass]" :style="[customStyle]">
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  customClass: {
    type: String,
    default: "",
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.l-loading {
  --size: 30px;
  --shape-size: 10px;
  --move-x: 10px;
  --move-y: 10px;

  margin: auto;
  width: var(--size);
  height: var(--size);
  position: relative;
  animation: animationContainer 1s ease infinite;
  .shape {
    width: var(--shape-size);
    height: var(--shape-size);
    border-radius: 50%;
    position: absolute;

    &:nth-child(1) {
      background-color: #1875e5;
      left: 0;
      animation: translateAlternate 0.5s ease infinite alternate;
    }

    &:nth-child(2) {
      background-color: #c5523f;
      right: 0;
      --move-x: -10px;
      animation: translateAlternate 0.5s ease
        infinite alternate;
    }

    &:nth-child(3) {
      background-color: #499255;
      bottom: 0;
      --move-y: -10px;
      animation: translateAlternate 0.5s ease infinite alternate;
    }

    &:nth-child(4) {
      background-color: #f2b736;
      right: 0;
      bottom: 0;
      --move-x: -10px;
      --move-y: -10px;
      animation: translateAlternate 0.5s ease infinite alternate;
    }
  }

  @keyframes animationContainer {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes translateAlternate {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(var(--move-x), var(--move-y));
    }
  }
}
</style>
