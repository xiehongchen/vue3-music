<template>
  <Layout />
  <Player />
  <PlayList />
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
musicStore.playing = false
</script>

<style lang="scss" scoped>

</style>