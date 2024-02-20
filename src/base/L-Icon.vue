<template>
  <!-- <span class="backdrop"> -->
    <i class="iconfont icon-componen icon-play"></i>
  <!-- </span> -->
  
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 16
  },
  type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ""
  },
  backdrop: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.backdrop {
  display: inline-block;
  @include flex-center;
  border-radius: 50%;

  &:hover {
    background: #373737;
  }
}
</style>