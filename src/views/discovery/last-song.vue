<template>
  <div class="last-song" v-if="list.length">
    <l-title>最新音乐</l-title>
    <div class="list-wrap">
      <div v-for="(item, listIndex) in thunkedList" :key="listIndex" class="list">
        <song-card 
          v-for="(song, songIndex) in item" 
          :key="song.id" 
          :order="getSongOrder(listIndex, songIndex)"
          v-bind="nomalizeSong(song)"
          @click.native="onClickSong(listIndex, songIndex)" 
          class="song-card"></song-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNewSongs } from "@/api"
import { createSong } from "@/utils"
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
interface listType {
  copywriter: string;
  id: string;
  picUrl: string;
  name: string;
  [key: string | number]: any;
}
const list = ref<listType[]>([]);
onMounted(() => {
  getList()
});

const getList = async () => {
  const { result } = (await getNewSongs()) as any;
  list.value = result || [];
  console.log('list', list.value)
}
const thunkedList = computed(() => {
  return [
    list.value.slice(0, chunkLimit.value),
    list.value.slice(chunkLimit.value, list.value.length)
  ]
})
const songsLimit = ref(10);
const chunkLimit = computed(() => Math.ceil(songsLimit.value / 2));
const getSongOrder = (listIndex: number, index: any) => {
  return listIndex * chunkLimit.value + index + 1;
};

const nomalizeSong =(song: any) => {
  const {
    id,
    name,
    song: {
      mvid,
      artists,
      album: { blurPicUrl },
      duration
    }
  } = song
  return createSong({
    id,
    name,
    img: blurPicUrl,
    artists,
    duration,
    mvId: mvid
  })
}
const normalizedSongs = computed(() => list.value.map((song: any) => nomalizeSong(song)))

const onClickSong = (listIndex: number, index: any) => {
  console.log(listIndex, index)
  const nomalizedSongIndex = getSongOrder(listIndex, index) - 1
  const nomalizedSong = normalizedSongs.value[nomalizedSongIndex]
  musicStore.startSong(nomalizedSong)
}
</script>

<style lang="scss" scoped>
.last-song {
  margin-bottom: 36px;

  .list-wrap {
    display: flex;

    .list {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
