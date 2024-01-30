<template>
  <div class="discovery">
    <!-- <Banner /> 
    <recommend-playlists /> -->
    <!-- <last-song /> -->
    <recommend-mv />
  </div>
</template>

<script setup lang="ts">
// import Banner from './banner.vue'
// import recommendPlaylists from './recommend-playlists.vue'
// import lastSong from './last-song.vue';
import recommendMv from './recommend-mv.vue';
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
  width: 100%;
}
</style>