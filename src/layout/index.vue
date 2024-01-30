<template>
  <div class="layout">
    <layout-header></layout-header>
    <div class="layout-main">
      <layout-menu></layout-menu>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
    <layout-player></layout-player>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/layout/header.vue'
import LayoutMenu from '@/layout/menu.vue'
import LayoutPlayer from '@/layout/player.vue'

</script>

<style lang="scss" scoped>
.layout {
  .layout-main {
    display: flex;
    height: calc(100vh - $header-height - $player-height);
    .main {
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>