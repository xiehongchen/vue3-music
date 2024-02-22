<template>
  <div class="recommend" v-if="list.length">
    <l-title>推荐歌单</l-title>
    <div class="list-wrap">
      <playlist-card v-for="item in list" :desc="item.copywriter" :id="item.id" :img="item.picUrl"
        :key="item.id" :name="item.name" @clickCard="clickCard"></playlist-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getPersonalized } from '@/api'
import { useRouter } from 'vue-router'
const router = useRouter()
interface listType {
  copywriter: string,
  id: string,
  picUrl: string,
  name: string,
  [key: string]: any
}
const list = ref<listType[]>([])
onMounted(async () => {
  const { result } = await getPersonalized({limit: 10}) as any
  list.value = result
})

const clickCard = (id: string) => {
  router.push(`/playlist/${id}`)
}

</script>

<style scoped lang='scss'>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>