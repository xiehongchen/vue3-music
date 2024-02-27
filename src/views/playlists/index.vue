<template>
  <div class="play-list" ref="playList">
    <div class="play-list-top" v-if="topPlaylist.id">
      <top-playlist-card 
        :desc="topPlaylist.description"
        :id="topPlaylist.id"
        :img="topPlaylist.coverImgUrl"
        :name="topPlaylist.name">
      </top-playlist-card>
    </div>
    <div class="tabs">
      <l-tab
        :data="tabs"
        @tabChange="getSongs"
        align="right"
        type="small"
        :active="activeTabIndex"
      />
    </div>
    <div class="play-list-card">
      <playlist-card
        v-for="item in playlists"
        :key="item.id"
        :img="item.coverImgUrl"
        :name="item.name"
        :desc="`播放量：${formatNumber(item.playCount)}`">
      </playlist-card>
    </div>
    <el-pagination 
      layout="prev, pager, next"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize" 
      :total="pagination.total"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { getPlaylists, getTopPlaylists } from '@/api'
import { getPageOffset, formatNumber } from '@/utils';
const tabs = reactive(["全部","欧美","华语","流行","说唱","摇滚","民谣","电子","轻音乐","影视原声","ACG","怀旧","治愈","旅行"])
const state = reactive({
  topPlaylist: {} as any,
  playlists: [] as any[]
})
const pagination = reactive({
  currentPage: 0,
  pageSize: 50,
  total: 0
})
const topPlaylist = computed(() => state.topPlaylist)
const playlists = computed(() => state.playlists)
const activeTabIndex = ref(0)

onMounted(() => {
  getTopPlaylist()
  getPlaylist()
})
const getSongs = (index: number) => {
  activeTabIndex.value = index
  getTopPlaylist()
  getPlaylist()
}
const getTopPlaylist = async () => {
  const { playlists } = await getTopPlaylists({
    limit: 1,
    cat: tabs[activeTabIndex.value]
  }) as any
  state.topPlaylist = playlists[0] || {}
}
const getPlaylist = async () => {
  const { playlists, total } = await getPlaylists({
    limit: pagination.pageSize,
    offset: getPageOffset(pagination.currentPage, pagination.pageSize),
    cat: tabs[activeTabIndex.value]
  }) as any
  state.playlists = playlists
  pagination.total = total
}
const playList = ref()
const currentChange = (page: number) => {
  pagination.currentPage = page
  getPlaylist()
  console.log('playList', playList)
  // 回到前面
  playList.value?.scrollIntoView({ behavior: "smooth" })
}
</script>

<style lang="scss" scoped>
.play-list {
  padding: 12px;
  &-top {
    margin-bottom: 16px;
  }
  &-card {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>