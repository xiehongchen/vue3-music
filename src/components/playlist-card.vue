<!--
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-01-16 12:12:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-01-31 11:19:09
 * @FilePath: /vue3-music/src/components/playlist-card.vue
 * @Description: 歌单卡片
-->
<template>
  <div @click="onClickCard" class="playlist-card">
    <div class="img-wrap">
      <img v-lazy="proxy.$utils.getImgUrl(img, 300)">
      <div class="desc-wrap" v-if="desc">
        <span class="desc">{{ desc }}</span>
      </div>
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance() as any;
// console.log('proxy', proxy)
const emit = defineEmits(['clickCard'])
const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})
const onClickCard = () => {
  emit('clickCard', props.id)
}
</script>

<style lang="scss" scoped>
.playlist-card {
  position: relative;
  width: calc(20% - 8px);
  margin: 4px;
  margin-bottom: 32px;
  cursor: pointer;

  .img-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .desc-wrap {
      position: absolute;
      padding: 6px;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
      transform: translateY(-100%);
      transition: all 0.3s;

      .desc {
        color: #FFFFFF;
        font-size: 12px;
      }
    }

    .play-icon {
      opacity: 0;
      position: absolute;
      right: 4px;
      bottom: 4px;
      font-size: 24px;
      transition: all 0.3s;
      color: #FFFFFF;
    }

    &:hover {
      .desc-wrap {
        transform: translateY(0);
      }

      .play-icon {
        opacity: 1;
      }
    }
  }

  .name {
    font-size: 12px;
    @include text-ellipsis();
  }
}
</style>