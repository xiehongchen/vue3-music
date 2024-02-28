<template>
  <transition name="slide">
    <div class="play-list" :class="isPlaylistShow ? 'show' : 'hide'">
      内容
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
const isPlaylistShow = computed(() => musicStore.isPlaylistShow)
</script>

<style lang="scss" scoped>
.play-list {
  position: fixed;
  top: calc($header-height + 20px);
  bottom: $player-height;
  right: 20px;
  width: 400px;
  height: calc(100% - $header-height - $player-height);
  padding: 0 36px;
  background: red;
  z-index: 1000;
  overflow: hidden;
  overflow-y: auto;
  transition: transform 0.5s;

  &.hide {
    display: none;
  }
}
</style>