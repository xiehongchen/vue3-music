<template>
  <div class="layout-player">
    <!-- 左侧 -->
    <div class="song">
      <template v-if="hasCurrentSong">
        <div class="img-wrap" @click="togglePlayerShow">
          <div class="mask"></div>
          <img v-lazy="getImgUrl(currentSong.img || '', 80)" class="blur" />
          <div class="player-control">
            <el-icon color="white">
              <ArrowDown v-if="isPlayerShow" />
              <ArrowUp v-else />
            </el-icon>
          </div>
        </div>
        <div class="content">
          <div class="top">
            <p class="name">{{ currentSong.name }}</p>
            <p class="split">-</p>
            <p class="artists">{{ currentSong.artistsText }}</p>
          </div>
          <div class="time">
            <span class="played-time">{{
              formatTime(currentTime)
            }}</span>
            <span class="split">/</span>
            <span class="total-time">{{
              formatTime((currentSong.duration || 0) / 1000)
            }}</span>
          </div>
        </div>
      </template>
    </div>
    <!-- 中间 -->
    <div class="control">
      <el-icon><DArrowLeft /></el-icon>
      <div class="play-icon">
        <el-icon><CaretRight /></el-icon>
      </div>
      <el-icon><DArrowRight /></el-icon>
    </div>
    <!-- 右侧 -->
    <div class="mode">
      <!-- 模式 -->
      <el-popover placement="top" trigger="hover" width="160">
        <p slot="-">{{ playModeText }}</p>
        <template #reference><el-icon><DArrowLeft /></el-icon></template>
        
        <!-- <Icon
          :size="20"
          :type="modeIcon"
          @click="onChangePlayMode"
          class="mode-item"
          slot="reference"
        /> -->
      </el-popover>
      <!-- 播放列表 -->
      <!-- <el-popover
        :value="isPlaylistPromptShow"
        placement="top"
        trigger="manual"
        width="160"
      >
        <p>已更新歌单</p>
        <Icon
          :size="20"
          @click="togglePlaylistShow"
          class="mode-item"
          slot="reference"
          type="playlist"
        />
      </el-popover> -->
      <!-- 音量 -->
      <!-- <div class="volume-item">
        <Volume :volume="volume" @volumeChange="onVolumeChange" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImgUrl, formatTime } from '@/utils'
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
const hasCurrentSong = computed(() => musicStore.hasCurrentSong)
const currentSong = computed(() => musicStore.currentSong)
const isPlayerShow = computed(() => musicStore.isPlayerShow)
const currentTime = computed(() => musicStore.currentTime)
console.log('currentSong', currentSong.value)
const togglePlayerShow = () => {
  musicStore.isPlayerShow = !musicStore.isPlayerShow
}

// const isPlayErrorPromptShow = ref(false)

const playModeText = ref('123')
</script>

<style lang="scss" scoped>
.layout-player {
  position: relative;
  position: fixed;
  z-index: 1002;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $player-height;
  padding: 8px 16px;
  padding-right: 24px;

  .song {
    display: flex;
    flex: 4;
    overflow: hidden;

    .img-wrap {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      @include img-wrap(40px);

      img {
        &.blur {
          filter: blur(2px);
        }
      }

      .player-control {
        @include abs-center;
      }

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: #333;
          @include text-ellipsis;
        }

        .split {
          font-size: 10px;
          margin: 0 4px;
        }

        .artists {
          font-size: 10px;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: 10px;
        color: #5c5c5c;

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: #d33a31;
      cursor: pointer;

      i {
        color: #fff;
      }
      .icon-play {
        transform: translateX(1px);
      }
    }

    .icon {
      color: #d33a31;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }

    .volume-item {
      margin-right: 22px;
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}

.icon {
  color: #4a4a4a;
  cursor: pointer;
}
</style>