<template>
  <div class="video-player" id="mse"></div>
</template>

<script setup lang='ts'>
import Player from 'xgplayer'
import 'xgplayer/dist/xgplayer.min.css'
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
const playing = computed(() => musicStore.playing)
const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  }

})
const player = ref()
const initPlayer = () => {
  console.log('props.url', props.url)
  if (!props.url) return
  player.value = new Player({
    id: 'mse',
    url: props.url,
    poster: props.poster,
    videoInit: true,
    lang: 'zh-cn',
    width: "100%",
    height: "500px",
  })
}

onMounted(() => {
  initPlayer()
  player.value.on('play', () => {
    musicStore.playing = false
  })
})

watch(() => props.url, (newUrl, oldUrl) => {
  if (newUrl && newUrl !== oldUrl) {
    if (!player.value) {
      initPlayer()
    } else {
      player.value.src = newUrl
      player.value.reload()
    }
  }
})

watch(() => playing.value, (newPlaying) => {
  if (player.value) {    
    if (newPlaying) {
      player.value.pause()
    }
  }
})
</script>

<style scoped lang='scss'>

</style>