<template>
  <div class="wrap">
    <div class="top_playlist_card">
      <div class="img_wrap">
        <img v-lazy="getImgUrl(img, 280)">
      </div>
      <div class="content">
        <div class="tag_wrap">
          <span>精品歌单</span>
        </div>
        <p class="name">{{ name }}</p>
        <p class="desc">{{ desc }}</p>
      </div>
    </div>
    <div class="background" :style="{ backgroundImage: `url(${img})` }"></div>
    <div class="background_mask"></div>
  </div>
</template>

<script setup lang="ts">
import { getImgUrl } from '@/utils';
defineProps({
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

</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;

  .top_playlist_card {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 16px;

    .img_wrap {
      @include img-wrap(140px);
      margin-right: 8px;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .tag_wrap {
        align-self: flex-start;
        padding: 4px 16px;
        margin-bottom: 16px;
        color: #cecece;
        border: 1px solid currentColor;
        border-radius: 4px;
      }

      .name {
        margin-bottom: 8px;
        font-size: 20px;
        color: #FFFFFF;
      }

      .desc {
        @include text-ellipsis-multi(5);
        font-size: 12px;
        color: #FFFFFF;
      }
    }
  }

  .background {
    @include abs-stretch;
    filter: blur(16px);
    z-index: 0;
  }

  .background_mask {
    @include abs-stretch;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
}
</style>