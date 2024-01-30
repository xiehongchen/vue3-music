<template>
  <div class="mv_card">
    <div class="img_wrap">
      <img v-lazy="getImgUrl(img, 500, 260)">
      <div class="play_count_wrap" v-if="playCount">
        {{ formatNumber(playCount) }}
      </div>
      <div class="duration_wrap" v-if="duration">
        {{ formatTime(duration / 1000) }}
      </div>
    </div>
    <p class="name" v-if="name">{{ name }}</p>
    <p class="author" v-if="author">{{ author }}</p>
  </div>
</template>

<script setup lang="ts">
import { getImgUrl, formatNumber, formatTime } from '@/utils';
defineProps({
  img: {
    type: String,
    default: ''
  },
  playCount: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.mv_card {
  width: 500px;
  padding: 10px;
  cursor: pointer;
  .img_wrap {
    position: relative;

    img {
      @include abs-stretch();
      width: 100%;
      border-radius: 4px;
    }

    .play_icon_wrap {
      @include abs-stretch;

      &:hover {
        .play-icon {
          opacity: 1;
        }
      }

      .play-icon {
        @include abs-center;

        opacity: 0;
        transition: opacity 0.3s;
      }
    }

    .play_count_wrap {
      display: flex;
      align-items: center;
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: 12px;
      color: #FFFFFF;

      i {
        display: inline-block;
        margin-right: 4px;
      }
    }

    .duration_wrap {
      position: absolute;
      right: 2px;
      bottom: 2px;
      font-size: 12px;
      color: #FFFFFF;
    }
  }

  .name {
    margin-top: 8px;
    @include text-ellipsis;
    font-size: 12px;
  }

  .author {
    margin-top: 4px;
    @include text-ellipsis;
    font-size: 12px;
  }
}
</style>