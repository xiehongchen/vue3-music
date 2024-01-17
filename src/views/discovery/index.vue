<template>
  <div class="discovery">
    <Banner /> 
    <recommend-playlists />
    <!-- <Banner2 /> -->
  </div>
</template>

<script setup lang="ts">
import Banner from './banner.vue'
import recommendPlaylists from './recommend-playlists.vue'
// import Banner2 from './banner2.vue'
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
  width: 100%;
}
</style>