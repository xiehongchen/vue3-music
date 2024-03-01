<template>
  <div class="video-player" id="mse"></div>
</template>

<script setup lang='ts'>
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
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
const initPlayer = () => {
  if (!props.url) return
  new Player({
    id: 'mse',
    url: props.url,
    poster: props.poster,
    videoInit: true,
    lang: 'zh-cn',
    width: "100%"
  })
}

onMounted(() => {
  initPlayer()
})

watch(() => props.url, (newUrl, oldUrl) => {
  if (newUrl && newUrl !== oldUrl) {
    initPlayer()
  } else {
    
  }
})
</script>

<style scoped lang='scss'>

</style>