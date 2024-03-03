<template>
  <transition name="slide">
    <div class="play-list" :class="isPlaylistShow ? 'show' : 'hide'">
      <L-Tab :data="tabs" v-model:active="activeTabIndex" align="center">

      </L-Tab>
      <div class="header">
        <p class="total">总共{{ dataSource.length }}首</p>
        <div class="remove" v-if="dataSource.length" @click="clear">
          <el-icon><Delete /></el-icon>
          <span class="text">清空</span>
        </div>
      </div>
      <div v-if="dataSource.length" class="song-table-wrap">
        <songTable :hideColumns="['index', 'img', 'albumName']" :song-list="dataSource" />
      </div>
      <div class="empty" v-else>你还没有添加任何歌曲</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
const isPlaylistShow = computed(() => musicStore.isPlaylistShow)
const tabs = reactive(["播放列表", "历史记录"])
const activeTabIndex = ref(0)

const dataSource = computed(() => {
  return activeTabIndex.value === 0 ? musicStore.playlist : musicStore.playHistoryList
})

const clear = () => {
  console.log('dataSource', dataSource.value)
}
</script>

<style lang="scss" scoped>
.play-list {
  position: fixed;
  top: calc($header-height + 20px);
  bottom: $player-height;
  right: 20px;
  width: 400px;
  height: calc(100% - $header-height - $player-height - 20px);
  padding: 0 10px;
  background: #fff;
  z-index: 1000;
  overflow: hidden;
  overflow-y: auto;
  transition: transform 0.5s;
  @include box-shadow;

  &.hide {
    display: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 0 20px;
    border-bottom: 1px solid #f2f2f1;

    .total {
      font-size: 12px;
    }

    .remove {
      @include flex-center;
      cursor: pointer;
      font-size: 12px;

      .text {
        display: inline-block;
        margin-left: 4px;
      }
    }
  }

  .song-table-wrap {
    flex: 1;
    overflow-y: auto;
  }

  .empty {
    @include flex-center();
    flex: 1;
  }
}
</style>