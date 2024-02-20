<template>
  <div
    :style="wrapStyle"
    class="play-icon-wrap"
  >
    <el-icon :size="iconSize" :color="color"><CaretRight /></el-icon>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: '#ff0000'
  }
})

const wrapStyle = computed(() => {
  return { width: `${props.size}px`, height: `${props.size}px` }
})

const iconSize = computed(() => {
  return props.size * 0.6
})
</script>

<style lang="scss" scoped>
.play-icon-wrap {
  @include flex-center();
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}
</style>
