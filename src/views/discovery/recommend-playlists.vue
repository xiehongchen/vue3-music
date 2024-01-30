<!--
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-01-16 11:53:49
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-01-30 14:27:59
 * @FilePath: /vue3-music/src/views/discovery/recommend-playlists.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="recommend" v-if="list.length">
    <l-title>推荐歌单</l-title>
    <div class="list-wrap">
      <playlist-card v-for="item in list" :desc="item.copywriter" :id="item.id" :img="item.picUrl"
        :key="item.id" :name="item.name"></playlist-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getPersonalized } from '@/api'
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

</script>

<style scoped lang='scss'>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>