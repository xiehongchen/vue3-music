<template>
  <div class="l-card" @click="onClick" :class="[customClass]" :style="[customStyle]">
    <slot name="img-wrap">
      <div class="img-wrap">
        <img v-lazy="proxy.$utils.getImgUrl(img, 50)">
        <slot name="img-mask"></slot>
      </div>
    </slot>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="desc">
        <slot name="desc">{{ desc }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance() as any; 
defineProps({
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  },
  img: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
})
const emit = defineEmits(['clickHandle'])
const onClick = (e: Event) => {
  emit('clickHandle', e)
}
</script>

<style lang="scss" scoped>
.l-card {
  display: flex;
  padding: 0 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--card-hover-bg-color);
  }
  .img-wrap {
    position: relative;
    @include img-wrap(50px);
    img {
      border-radius: 4px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
    overflow: hidden;
    .name {
      margin-bottom: 4px;
      font-size: $font-size-13;
      @include text-ellipsis();
    }
    .desc {
      font-size: $font-size-12;
      color: #727272;
      @include text-ellipsis();
    }
  }
}
</style>