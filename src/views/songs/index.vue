<template>
  <div class="songs">
    <div class="taqbs">
      <l-tab
        :data="tabs"
        @tabChange="getSongs"
        align="right"
        type="small"
        :active="activeTabIndex"
      />
    </div>
    <song-table :song-list="songs"></song-table>
  </div>
</template>

<script setup lang="ts">
import { getTopSongs } from '@/api';
import { createSong } from '@/utils';

const songs = ref([])
const activeTabIndex = ref(0)
const tabs = reactive([{ title: "全部", type: 0 },{ title: "华语", type: 7 },{ title: "欧美", type: 96 },{ title: "日本", type: 8 },{ title: "韩国", type: 16 }])
onMounted(() => {
  getSongs(0)
})
const getSongs = async (index: number) => {
  activeTabIndex.value = index
  const { data } = await getTopSongs(tabs[activeTabIndex.value].type) as any
  songs.value = data.map((song: any) => {
    const {
      id,
      name,
      artists,
      duration,
      mvid,
      album: { picUrl, name: albumName }
    } = song
    return createSong({
      id,
      name,
      artists,
      duration,
      albumName,
      img: picUrl,
      mvId: mvid
    })
  })
}
</script>

<style lang="scss" scoped>

</style>