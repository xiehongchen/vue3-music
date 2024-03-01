<template>
  <div class="mv-card" @click="goMv">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(img, 500, 260)">
      <div class="play-count-wrap" v-if="playCount">
        {{ formatNumber(playCount) }}
      </div>
      <div class="play-icon-wrap">
        <PlayIcon :size="48" class="play-icon" />
      </div>
      <div class="duration-wrap" v-if="duration">
        {{ formatTime(duration / 1000) }}
      </div>
    </div>
    <p class="name" v-if="name">{{ name }}</p>
    <p class="author" v-if="author">{{ author }}</p>
  </div>
</template>

<script setup lang="ts">
import { getImgUrl, formatNumber, formatTime } from '@/utils';
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
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

const goMv = () => {
  if (props.img) {
    router.push({
      path: `/mv/${props.id}`
    })
  }
}
</script>

<style lang="scss" scoped>
.mv-card {
  min-width: 140px;
  padding: 10px;
  cursor: pointer;
  .img-wrap {
    position: relative;
    padding-top: 56%;
    img {
      @include abs-stretch();
      width: 100%;
      border-radius: 4px;
    }

    .play-icon-wrap {
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

    .play-count-wrap {
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

    .duration-wrap {
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