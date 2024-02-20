<!--
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-01-17 16:26:20
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-01-30 14:31:29
 * @FilePath: /vue3-music/src/components/song-card.vue
 * @Description: 歌曲卡片
 * 认真学习每一天
-->
<template>
  <div class="song-card">
    <div class="order-wrap">
      <span class="order">{{ pad(order) }}</span>
    </div>
    <div class="img-wrap">
      <img v-lazy="getImgUrl(img, 300)">
    </div>
    <div class="song-content">
      <p class="song-name">{{ name }}</p>
      <p class="singer">{{ artistsText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pad, getImgUrl } from '@/utils'

defineProps({
  order: {
    type: Number
  },
  img: {
    type: String,
    default: ''
  },
  name: {
    type: String
  },
  artistsText: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.song-card {
  display: flex;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;

  div {
    flex-shrink: 0;
  }

  &:hover {
    background: #FFFFFF;
  }
  .order-wrap {
    @include flex-center();
    width: 30px;
    margin-right: 8px;
  }

  .img-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 8px;
    img {
      width: 100%;
      height: 100%;
    }

    .play-icon {
      @include abs-center;
    }
  }

  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    overflow: hidden;

    .song-name {
      @include text-ellipsis;
    }

    .singer {
      @include text-ellipsis;
    }
  }
}
</style>