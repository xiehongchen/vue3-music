<template>
  <el-table class="song-table" :data="songList">
    <el-table-column prop="index" label="" width="70">
      <template #default="scope">
        <div v-if="isActiveSong(scope.row)">
          
        </div>
        <div v-else>
          <span>{{ pad(scope.$index + 1) }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="img" label="" width="100">
      <template #default="scope">
        <div class="img-wrap">
          <img v-lazy="getImgUrl(scope.row.img, 120)">
          <PlayIcon class="play-icon" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" lable="">

    </el-table-column>
    <el-table-column prop="artistsText" label=""></el-table-column>
    <el-table-column prop="albumName" label=""></el-table-column>
    <el-table-column prop="albumNdurationSecondame" label="" width="100">
      <template #default="scope">
        <div>
          {{ formatTime(scope.row.durationSecond) }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang='ts'>
import { pad, getImgUrl, formatTime } from '@/utils'
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
defineProps({
  songList: {
    type: Array,
    default: []
  }
})

const isActiveSong = (song: any) => {
  return song.id === musicStore.currentSong
}
</script>

<style scoped lang='scss'>
.song-table {
  .title-th {
    color: #333;
    font-weight: normal;
  }

  .title-td {
    color: #fff;
  }

  .padding-space {
    padding-left: 24px;
  }

  .song-active {
    color: #eee;

    .high-light-text {
      color: #fff;
    }
  }

  .index-wrap {
    text-align: center;
    color: #666;
  }

  .img-wrap {
    position: relative;
    @include img-wrap(60px);

    img {
      border-radius: 4px;
    }
    .play-icon {
      @include abs-center;
    }
  }
  .high-light-text {
    color: blue;
  }

  .song-table-name-cell {
    @include text-ellipsis;
    display: flex;
    align-items: center;
    flex: 0 0 24px;

    .song-table-name {
      overflow: hidden;
      @include text-ellipsis;
    }

    .mv-icon {
      width: 24px;
      margin-left: 4px;
    }
  }
}
</style>