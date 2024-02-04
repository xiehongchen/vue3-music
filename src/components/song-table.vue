<template>
    <el-table class="song_table" :data="songList">
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
          <div class="img_wrap">
            <img v-lazy="getImgUrl(scope.row.img, 120)">
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
import { musicStore } from '@/store/music';
import { pad, getImgUrl, formatTime } from '@/utils'
const music = musicStore()
defineProps({
  songList: {
    type: Array,
    default: []
  }
})

const isActiveSong = (song: any) => {
  return song.id === music.currentSong
}
</script>

<style scoped lang='scss'>

</style>