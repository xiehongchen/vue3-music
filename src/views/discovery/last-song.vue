<template>
  <div class="last-song" v-if="list.length">
    <l-title>最新音乐</l-title>
    <div class="list-wrap">
      <!-- <div v-for="item, index in list" :key="index" class="list">
        
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api'
interface listType {
  copywriter: string,
  id: string,
  picUrl: string,
  name: string,
  [key: string]: any
}
const list = ref<listType[]>([])
onMounted(async () => {
  const { result } = await api.discovery.getNewSongs() as any
  list.value = result
})
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