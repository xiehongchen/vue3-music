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
        <div class="img-wrap" @click="start(scope.row)">
          <img v-lazy="getImgUrl(scope.row.img, 120)">
          <PlayIcon class="play-icon" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" lable="">
      <template #default="scope">
        <div style="display: flex;">
          <div>{{ scope.row.name }}</div>
          <span
            v-if="scope.row.mvId"
            @click="onGoMv(scope.row.mvId)"
            class="mv-icon"
          >MV</span>
        </div>
      </template>
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
import { useRouter } from 'vue-router'
const router = useRouter()
const musicStore = useMusicStore()
const props = defineProps({
  songList: {
    type: Array,
    default: []
  }
})


const isActiveSong = (song: any) => {
  return song.id === musicStore.currentSong
}

const start = (song: any) => {
  console.log('props.songList', props.songList)
  const list = props.songList.filter((item: any) => item.mvId)
  console.log('list', list)
  musicStore.startSong(song)
}
const onGoMv = (id: string) => {
  musicStore.isPlayerShow = false
  router.push({
    path: `/mv/${id}`
  })
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
    cursor: pointer;

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
  }
  .mv-icon {
    display: inline-block;
    margin-left: 8px;
    padding: 2px;
    border: 1px solid currentColor;
    border-radius: 2px;
    color: red;
    cursor: pointer;
  }
}
</style>