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
      <i class="icon iconfont icon-step-backward" @click="prev"></i>
      <i class="icon iconfont icon-backward" @click="back"></i>
      <div class="play-icon" @click="togglePlaying">
        <i class="icon iconfont" :class="iconClass"></i>
      </div>
      <i class="icon iconfont icon-forward" @click="forward"></i>
      <i class="icon iconfont icon-step-forward" @click="next"></i>
    </div>
    <!-- 右侧 -->
    <div class="mode">
      <!-- 模式 -->
      <div class="mode-item" @click="changeMode">
        <i class="icon iconfont" :class="musicStore.playMode"></i>
      </div>
      <div class="mode-item" @click="changePlayListShow">
        <i class="icon iconfont" :class="musicStore.isPlaylistShow ? 'icon-outdent' : 'icon-indent'"></i>
      </div>
      <!-- 音量 -->
      <div class="volume-icon" @click="volumeIconChange">
        <i class="icon iconfont" :class="volumeIcon"></i>
      </div>
      <div class="volume-item">
        <el-slider v-model="volume" :min="0" :max="1" :step="0.1" :show-tooltip="false" @change="volumeChange"/>
      </div>
    </div>
    <div class="progress-bar-wrap">
      <progress-bar :percent="playPercent" :disabled="!hasCurrentSong" @change="percentChange" />
    </div>
    <audio
      :src="currentSong.url"
      @canplay="ready"
      @ended="end"
      @timeupdate="updateTime"
      ref="audioRef"
      @error="audioError"
    ></audio>
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

const playPercent = computed(() => {
  if (!currentSong.value.durationSecond) return 0
  const percent = Math.min(currentTime.value / currentSong.value.durationSecond, 1) || 0
  // console.log('percent', percent);
  return percent
})

// 更换播放模式
const changeMode = () => {
  musicStore.changePlayMode()
}

// 播放列表显示
const changePlayListShow = () => {
  musicStore.isPlaylistShow = !musicStore.isPlaylistShow
}

const songReady = ref(false)
const togglePlaying = () => {
  if (currentSong.value.id) {
    musicStore.playing = !musicStore.playing
  }
}
const iconClass = computed(() => {
  return musicStore.playing ? ' icon-poweroff-circle-fill' : 'icon-play-circle-fill'
})
// 准备播放
const ready = () => {
  console.log('准备播放');
  songReady.value = true
}
// 播放结束
const end = () => {
  next()
}
// 更新时间
const updateTime = (e: Event) => {
  const audio = e.target as HTMLAudioElement
  musicStore.currentTime = audio.currentTime
}
// 播放错误
const audioError = (e: Event) => {
  console.log('播放错误', e);
  // songReady.value = false
  setTimeout(() => {
    next()
  }, 1000)
}
// 下一首
const next = () => {
  if (songReady.value) {
    musicStore.playNext()
  }
}
// 上一首
const prev = () => {
  if (songReady.value) {
    musicStore.playPrev()
  }
}
// 后退15秒
const back = () => {
  if (songReady.value) {
    musicStore.currentTime -= 15
    audioRef.value.currentTime = musicStore.currentTime
  }
}
// 前进15秒
const forward = () => {
  if (songReady.value) {
    musicStore.currentTime += 15
    audioRef.value.currentTime = musicStore.currentTime
  }
}
const audioRef = ref()
const play = async () => {
  console.log('开始播放');
  console.log('songReady', songReady.value);
  console.log('audioRef', audioRef.value);
  if (audioRef.value && songReady.value) {
    try {
      audioRef.value.currentTime = musicStore.currentTime
      nextTick(() => {
        audioRef.value.play()
      })
    } catch (error) {
      console.log('播放失败', error)
    }
  }
}

// 监听音量
const volume = ref(0)
const volumeIcon = ref('icon-shengyin')
const volumeChange = (val: number) => {
  console.log('val', val);
  if (audioRef.value) {
    audioRef.value.volume = val
    if (val === 0) {
      volumeIcon.value = 'icon-shengyinjingyin'
    } else {
      volumeIcon.value = 'icon-shengyin'
    }
  }
}

// 音量图标切换
const volumeIconChange = () => {
  if (audioRef.value) {
    if (volumeIcon.value === 'icon-shengyin') {
      volumeIcon.value = 'icon-shengyinjingyin'
      audioRef.value.volume = 0
      volume.value = 0
    } else {
      volumeIcon.value = 'icon-shengyin'
      audioRef.value.volume = 1
      volume.value = 1
    }
  }
}

// 监听播放进度
const percentChange = (val: number) => {
  console.log('val', val)
  if (songReady.value && currentSong.value.durationSecond) {
    musicStore.currentTime = currentSong.value.durationSecond * val
    audioRef.value.currentTime = musicStore.currentTime
  }
}

onMounted(() => {
  musicStore.audioElement = audioRef.value
  volume.value = audioRef.value?.volume || 0
  volumeIcon.value = audioRef.value?.volume === 0 ? 'icon-shengyinjingyin' : 'icon-shengyin'
  console.log('audioRef', audioRef);
})


// 监听播放状态
watch(
  () => musicStore.playing,
  (newVal) => {
    if (newVal) {
      play()
    } else {
      audioRef.value?.pause()
    }
  }
)
// 监听歌曲变化
watch(
  () => musicStore.currentSong,
  (newVal) => {
    if (newVal) {
      play()
    }
  }
)
</script>

<style lang="scss" scoped>
.layout-player {
  position: relative;
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
      margin: 0 16px;
      cursor: pointer;
      i {
        font-size: 50px;
        color: #d33a31;
      }
    }

    .icon {
      font-size: 30px;
      color: #d33a31;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      margin-right: 16px;
    }
    .volume-icon {
      margin-right: 10px;
      .icon {
        font-size: 30px;
      }
    }
    .volume-item {
      margin-right: 22px;
      width: 200px;
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
  font-size: 30px;
  color: #4a4a4a;
  cursor: pointer;
}
</style>